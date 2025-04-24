from rest_framework import serializers
from .models import Category, Product, Order, OrderItem
from django.db import models
from django.contrib.auth.models import User
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'stock', 'category', 'owner']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'product', 'quantity']
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # ForeignKey #2
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
class OrderItemSerializer(serializers.Serializer):
    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'qunatity']
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()