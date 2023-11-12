# myapp/utils.py
from rest_framework_simplejwt.tokens import AccessToken

def validate_access_token(access_token):
    try:
        # Token'ı oluştur ve doğrula
        token = AccessToken(access_token)
        token_payload = token.payload  # Token'ın içeriğine erişim

        # İhtiyaca göre token içeriğini kontrol et
        user_id = token_payload.get('user_id')
        username = token_payload.get('username')

        # Token doğrulandı
        return True, {'user_id': user_id, 'username': username}

    except Exception as e:
        # Token doğrulama başarısız oldu
        return False, str(e)
