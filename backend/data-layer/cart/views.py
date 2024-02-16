from .models import Cart
from product.models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import IsAuthenticated

class GetCartAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        cart = Cart.objects.filter(user=user)
        if cart is None:
            return Response({},status=status.HTTP_204_NO_CONTENT)
        totalPrice = 0
        for item in cart:
            product = item.product
            if (product.product_quantity<item.cart_quantity):
                item.cart_quantity = product.product_quantity
                if (item.cart_quantity>0):
                    item.save()
                else:
                    item.delete()
            product_price = product.product_price
            totalPrice = totalPrice + product_price*item.cart_quantity
        serializer = GetCartSerializer(cart, many=True)
        return Response({"cart": serializer.data ,"totalPrice":totalPrice} , status=status.HTTP_200_OK)

class AddProductAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        user = request.user
        try:
            product = Product.objects.get(id=id)
            print(product)
        except Product.DoesNotExist:
            return Response({'Errors':'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        product_in_cart = Cart.objects.filter(product=product, user=user).exists()

        if product_in_cart:
            cart = Cart.objects.get(product=product, user=user)
            if (cart.cart_quantity<product.product_quantity):
                cart.cart_quantity = cart.cart_quantity+1
                cart.save()
            else :
                return Response({'error':'Not Avaliable'}, status=status.HTTP_204_NO_CONTENT)
        else:
            if(product.product_quantity>0):
                cart = Cart.objects.create(user=user, product=product, cart_quantity=1)
                cart.save()
            else:
                return Response({'error':'Not Avaliable'}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({'Result':'Product added.'}, status=status.HTTP_200_OK)

class RemoveProductAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        user = request.user
        try:
            product = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response({'Errors':'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        try: 
            cart = Cart.objects.get(user=user, product=product)
        except Cart.DoesNotExist:
            return Response({'Errors':'Product not found in Cart.'}, status=status.HTTP_404_NOT_FOUND)
        
        cart = Cart.objects.get(product=product, user=user)

        if cart.cart_quantity>1:
            cart.cart_quantity = cart.cart_quantity-1
            cart.save()
        else:
            cart = Cart.objects.filter(user=user, product=product)
            cart.delete()
        
        return Response({'Result':'Product removed.'}, status=status.HTTP_200_OK)

class RemoveCartAPI(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        user = request.user
        try:
            cart = Cart.objects.filter(user=user)
            cart.delete()
            return Response({'Result':'Cart removed.'}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'Errors':'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)

