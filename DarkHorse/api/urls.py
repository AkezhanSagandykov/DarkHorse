from django.urls import path
from .views import product_list, create_order, logout_view, ProductCreateView, UserOrdersView, ProductDeleteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/products/', product_list, name='product-list'),
    path('api/orders/create/', create_order, name='create-order'),
    path('api/logout/', logout_view, name='logout'),
    path('api/products/create/', ProductCreateView.as_view(), name='create-product'),
    path('api/orders/my/', UserOrdersView.as_view(), name='user-orders'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/products/delete/<int:pk>/', ProductDeleteView.as_view(), name='product-delete'),
]