from .models import Order, OrderProducts
from cart.models import Cart
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta

class OrderHistoryAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        orderHistory = Order.objects.filter(user=user).order_by("-id")
        serializer = OrderHistorySerializer(orderHistory, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProductByOrderAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            order = Order.objects.get(pk=id)
        except Order.DoesNotExist:
            print("order")
            return Response({'errors':'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        product = OrderProducts.objects.filter(ordered=order)
        serializer = ProductByOrderSerializer(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CreateOrderAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):

        serializer = CreateOrderSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user
            cart_exist = Cart.objects.filter(user=user).exists()
            if cart_exist==False:
                return Response({'errors':'Cart Empty'}, status=status.HTTP_204_NO_CONTENT)
            payment_mode = serializer.validated_data["payment_mode"]
            carts = Cart.objects.filter(user=user)
            total_items = len(carts)
            delivery_status = "Order Received"
            current_date = datetime.now().date()
            deliver_at = current_date + timedelta(days=5)
            amount = serializer.validated_data["amount"]
            delivered_name = serializer.validated_data["delivered_name"]
            delivered_phone_number = serializer.validated_data["delivered_phone_number"]
            delivered_address = serializer.validated_data["delivered_address"]
            order = Order.objects.create(user=user, amount=amount, payment_mode=payment_mode, deliver_at=deliver_at, delivery_status=delivery_status, total_items=total_items, delivered_name=delivered_name, delivered_phone_number=delivered_phone_number, delivered_address=delivered_address)
            order.save()
            for item in carts:
                product = item.product
                product_quantity = item.cart_quantity
                ordered_imageurl = product.product_imageurl
                ordered_details = product.product_details
                ordered_brand = product.product_brand
                ordered_price = product.product_price
                product.product_quantity = product.product_quantity-item.cart_quantity
                product.save()

                orderProducts = OrderProducts.objects.create(ordered=order, product_quantity=product_quantity, ordered_details=ordered_details, ordered_brand=ordered_brand, ordered_imageurl=ordered_imageurl, ordered_price=ordered_price)
                orderProducts.save()

            carts.delete()
            return Response({'Result':'Order Placed.'}, status=status.HTTP_201_CREATED)




        return Response({"errors":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

