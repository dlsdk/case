from rest_framework import generics, permissions
from .models import CustomUser
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer, LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Gelen refresh_token'ı alma
            refresh_token = request.data.get("refresh_token")

            # Eğer refresh_token yoksa hata döndür
            if not refresh_token:
                return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Gelen refresh_token ile bir RefreshToken objesi oluştur
            token = RefreshToken(refresh_token)

            # Token'ı karalisteye al
            token.blacklist()

            # Ekstra kontrol: Gelen token ile beklenen tokenın eşleşip eşleşmediğini kontrol et
            if refresh_token != str(token):
                print("Gelen token ile beklenen token uyuşmuyor!")

            return Response("Successfully logged out.", status=status.HTTP_200_OK)

        except Exception as e:
            # Hata durumunda hata mesajını ve HTTP 400 hatasını döndür
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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

        if user.password == password:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            print('Invalid password for user:', email)
            return Response({'error': 'Invalid credentials'}, status=401)

class CustomUserRegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        refresh = RefreshToken.for_user(serializer.instance)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, headers=headers)


class ChangePasswordView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'status': 'Password changed successfully'})
