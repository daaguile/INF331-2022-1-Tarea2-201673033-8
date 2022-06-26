from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.contact_list),
    path('contacts/<int:id>', views.contact_detail),
    path('contacts/deleteAll', views.deleteAll)
]
