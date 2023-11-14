# Case Projesi

Case Projesi'ne hoş geldiniz! Bu proje, bir Django backend ve bir React frontend içermektedir.

## Proje Yapısı

Proje, temelde iki ana bölüme ayrılmıştır:

- `django`: Uygulamanın Django backend kısmı.
- `react`: Uygulamanın React frontend kısmı.

## Başlangıç

### Django Backend'i Çalıştırma

1. `Backend` dizinine gidin:

    cd Backend
2. Migrasyonları uygulayın:
   
    python manage.py migrate

3. Admin hesabı oluşturun
   python manage.py createsuperuser
    
4. Django geliştirme sunucusunu başlatın:

    python manage.py runserver

   Django backend, [http://localhost:8000](http://localhost:8000/admin) adresinden erişilebilir.

### React Frontend'i Çalıştırma

1. `case` dizinine gidin:

    cd case

2. Node.js bağımlılıklarını yükleyin:

    npm install

3. React geliştirme sunucusunu başlatın:

    npm start

   React frontend, [http://localhost:3000](http://localhost:3000) adresinden erişilebilir.

## Docker Desteği

Bu proje, konteynerleştirmek için Docker desteği de içermektedir. Docker konteynerlerini oluşturmak ve çalıştırmak için ilgili Docker dosyalarındaki talimatları izleyin.

    - cd case
    - npm install
    - cd ..
    - docker-compose up --build


