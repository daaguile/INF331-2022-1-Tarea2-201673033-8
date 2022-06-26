from django.db import models

# Contacts Model


class Contact(models.Model):
    name = models.CharField(max_length=25)
    lastName = models.CharField(max_length=25)
    secondLastName = models.CharField(max_length=25)
    phone = models.CharField(max_length=9)
    email = models.EmailField(max_length=255)

    class Meta:
        ordering = ['lastName']
