"""from django.urls import path
from .views import CustomUserRegisterView, LoginView, ChangePasswordView, UserProfileView, ForgotPasswordView

urlpatterns = [
    path('register/', CustomUserRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password')
]
"""