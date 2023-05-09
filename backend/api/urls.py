from django.urls import path
from .views import AddUserView, MyTokenObtainPairView, BookView, BookDetailView, BookCreateAPIView, BookListAPIView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('adduser', AddUserView.as_view() ),
    path('book', BookCreateAPIView.as_view() ),
    path('booklist', BookListAPIView.as_view() ),
    path('bookdetail/<int:id>/', BookDetailView.as_view(), name='bookdetail' ),
    # path('bookdetail/<int:id>', BookDetailView.as_view(), name='bookdetail' ),

    # path('update/<int:id>/', UpdateBookAPIView.as_view(), name='book_update'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
