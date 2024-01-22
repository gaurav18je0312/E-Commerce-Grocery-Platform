from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .permissions import IsAdmin
from django.core.paginator import Paginator, EmptyPage

class AddProductAPI(APIView):
    permission_classes = [IsAdmin]
    def post(self, request):
        serializer = AddProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Result':'Product added successfully.'}, status=status.HTTP_201_CREATED)
        
        return Response({'errors':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateProductAPI(APIView):
    permission_classes = [IsAdmin]
    def put(self, request, id):
        serializer = UpdateProductSerializer(data=request.data)
        if serializer.is_valid():
            product = Product.objects.get(pk=id)
            product.product_brand = serializer.validated_data['product_brand']
            product.product_details = serializer.validated_data['product_details']
            product.product_description = serializer.validated_data['product_description']
            product.product_price = serializer.validated_data['product_price']
            product.product_quantity = serializer.validated_data['product_quantity']
            product.product_imageurl = serializer.validated_data['product_imageurl']
            product.product_category = serializer.validated_data['product_category']
            product.save()
            return Response({'Result':'Product Updated'}, status=status.HTTP_202_ACCEPTED)
        
        return Response({'errors':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class ProductViewAPI(APIView):
    def get(self, request, page):
        product=Product.objects.all().order_by('id')
        paginator = Paginator(product, 10)
        total_pages = paginator.num_pages
        try:
            page_product = paginator.page(page)
            serializer = ProductViewSerializer(page_product, many=True)
            return Response({'products': serializer.data, 'total_pages':total_pages}, status=status.HTTP_200_OK) 
        except EmptyPage:
            return Response({'Result':'Success'}, status=status.HTTP_204_NO_CONTENT)

    
class ProductByCategoryAPI(APIView):
    def get(self, request, category, brand, mn, mx,sort, page):
        products = Product.objects.all().order_by('id')
        category = category.replace("+"," ")
        mn = int(mn)
        mx = int(mx)
        sort = int(sort)
        print(sort)
        brand = brand.replace("+"," ")
        print(category, brand, mn, mx, sort, page)
        if category!="None":
            products = products.filter(product_category=category)
            print(products)
        if brand!="None":
            products = products.filter(product_brand=brand)
            print("brand")
        if mn!=0:
            products = products.filter(product_price__gte=mn)
            print("mn")
        if mx!=0:
            products = products.filter(product_price__lte=mx)
            print("mx")
        if sort==1:
            products = products.order_by("product_price")
        elif sort==2:
            products = products.order_by("-product_price")
        paginator = Paginator(products, 10)
        total_pages = paginator.num_pages
        try:
            page_product = paginator.page(page)
            serializer = ProductByCategorySerializer(page_product, many=True)
            return Response({'products': serializer.data, 'total_pages':total_pages}, status=status.HTTP_200_OK) 
        except EmptyPage:
            return Response({'Result':'Success'}, status=status.HTTP_204_NO_CONTENT)
    
    
class ProductBySearchAPI(APIView):
    def get(self, request, search, page):
        search = search.replace("+", " ")
        product = Product.objects.filter(product_details__iregex=search)
        paginator = Paginator(product, 10)
        total_pages = paginator.num_pages
        try:
            page_product = paginator.page(page)
            serializer = ProductBySearchSerializer(page_product, many=True)
            return Response({'products': serializer.data, 'total_pages':total_pages}, status=status.HTTP_200_OK) 
        except EmptyPage:
            return Response({'Result':'Success'}, status=status.HTTP_204_NO_CONTENT)
    
class ProductViewByAdminAPI(APIView):
    permission_classes = [IsAdmin]
    def get(self, request):
        product = Product.objects.all()
        serializer = ProductViewByAdminSerializer(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GetProductAPI(APIView):
    def get(self, request, id):
        try:
            product=Product.objects.get(pk=id)
            serializer = GetProductSerilizer(product)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except Product.DoesNotExist:
            return Response({"Result":"failure"}, status=status.HTTP_400_BAD_REQUEST)
    
class GetProductByAdminAPI(APIView):
    def get(self, request, id):
        product=Product.objects.get(pk=id)
        serializer = GetProductByAdminSerilizer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteProductAPI(APIView):
    permission_classes =[IsAdmin]
    def delete(self, request, id):
        try:
            product = Product.objects.get(pk=id)
            product.delete()
            return Response({"Result":"Success"}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error":"Product not exist"}, status=status.HTTP_404_NOT_FOUND)