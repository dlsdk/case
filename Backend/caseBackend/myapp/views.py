from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer, LoginSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserProfileView(APIView):

    # Remove the IsAuthenticated permission class to allow unauthenticated access
    # permission_classes = [IsAuthenticated]

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

        # Eğer güncellenmek istenen kullanıcı ID'si boş ise hata döndür
        if not user_id_to_update:
            return Response({'id': ['Kullanıcı ID boş olamaz.']}, status=status.HTTP_400_BAD_REQUEST)

        # Güncellenmek istenen kullanıcıyı bul
        try:
            user_to_update = CustomUser.objects.get(id=user_id_to_update)
        except CustomUser.DoesNotExist:
            return Response({'id': ['Bu ID\'ye sahip kullanıcı bulunamadı.']}, status=status.HTTP_404_NOT_FOUND)

        # Güncelleme işlemini gerçekleştir
        serializer = UserProfileSerializer(user_to_update, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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

        if user.password == password:
            refresh = RefreshToken.for_user(user)

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
        user_id_to_update = request.data.get('id', None)
        new_password = request.data.get('new_password', None)

        # Eğer güncellenmek istenen kullanıcı ID'si veya yeni şifre boş ise hata döndür
        if not user_id_to_update or not new_password:
            return Response({'message': 'Lütfen tüm alanları doldurun.'}, status=status.HTTP_400_BAD_REQUEST)

        # Güncellenmek istenen kullanıcıyı bul
        try:
            user_to_update = CustomUser.objects.get(id=user_id_to_update)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Bu ID\'ye sahip kullanıcı bulunamadı.'}, status=status.HTTP_404_NOT_FOUND)

        # Yeni şifreyi ayarla ve kaydet
        user_to_update.password = new_password
        user_to_update.save()

        return Response({'message': 'Şifre başarıyla değiştirildi.'}, status=status.HTTP_200_OK)

