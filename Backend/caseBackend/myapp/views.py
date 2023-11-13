from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer, LoginSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from urllib.parse import quote
class UserProfileView(APIView):

    def get(self, request):
        email = request.query_params.get('email', None)

        if not email:
            return Response({'error': 'Email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_profile = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user_profile_serializer = UserProfileSerializer(user_profile)
        return Response(user_profile_serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user_id_to_update = request.data.get('id', None)
        if not user_id_to_update:
            return Response({'id': ['Kullanıcı ID boş olamaz.']}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_to_update = CustomUser.objects.get(id=user_id_to_update)
        except CustomUser.DoesNotExist:
            return Response({'id': ['Bu ID\'ye sahip kullanıcı bulunamadı.']}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserProfileSerializer(user_to_update, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    pass

class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            print('User does not exist:', email)
            return Response({'error': 'Invalid credentials'}, status=401)

        print("password: ", password, "user.password: ", user.password)
        print(check_password(password, user.password))

        if check_password(password, user.password):
            refresh = RefreshToken.for_user(user)

            print('Refresh Token:', refresh)

            user_serializer = CustomUserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data,
            })
        else:
            print('Invalid password for user:', email)
            return Response({'error': 'Invalid credentials'}, status=401)



class CustomUserRegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        refresh = RefreshToken.for_user(serializer.instance)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, headers=headers)


class ChangePasswordView(APIView):
    def put(self, request):
        email_to_update = request.data.get('email', None)
        new_password = request.data.get('new_password', None)

        if not email_to_update or not new_password:
            return Response({'message': 'Please fill in all fields.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_to_update = CustomUser.objects.get(email=email_to_update)
        except CustomUser.DoesNotExist:
            return Response({'message': 'User with this email not found.'}, status=status.HTTP_404_NOT_FOUND)

        user_to_update.set_password(new_password)
        user_to_update.save()

        return Response({'message': 'Password successfully changed.'}, status=status.HTTP_200_OK)


class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email', None)

        if not email:
            return Response({'message': 'Please provide an email address.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Generate a password reset key
        confirmation = EmailConfirmationHMAC(user)
        key = confirmation.key

        # Encode the email and include it in the password reset link
        encoded_email = quote(email)
        reset_url = f"http://localhost:3000/auth/reset-password/{key}?email={encoded_email}"

        subject = "Reset your password"
        message = f"Click the following link to reset your password: {reset_url}"

        user.email_user(subject, message)

        return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)

