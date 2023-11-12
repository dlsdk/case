from django.urls import path
from .views import CustomUserRegisterView, LoginView, ChangePasswordView, UserProfileUpdateView

urlpatterns = [
    path('register/', CustomUserRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('user/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
]
