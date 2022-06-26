import email
from django.shortcuts import render
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from api.serializers import UserSerializer, GroupSerializer, ContactSerializer
from api.models import Contact

import re


def isValidName(name):
    return bool(re.match("^[a-zA-Z]{1,25}$", name))


def isValidEmail(email):
    return bool(re.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", email))


def isValidPhone(phone):
    return bool(re.match("^9[0-9]{8}$", phone))


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]


def validateData(data):

    error = False
    res = {'errors': []}
    if not isValidName(data['name']):
        error = True
        res['errors'].append({'n': 'Nombre inválido'})

    if not isValidName(data['lastName']):
        error = True
        res['errors'].append({'l': 'Apellido inválido'})

    if not isValidName(data['secondLastName']):
        error = True
        res['errors'].append({'s': 'Segundo apellido inválido'})

    if not isValidEmail(data['email']):
        error = True
        res['errors'].append({'e': 'Email no válido'})

    if not isValidPhone(data['phone']):
        error = True
        res['errors'].append({'p': 'Teléfono no válido'})

    return error, res


@csrf_exempt
def contact_list(request):
    """
    List all contacts, or create a new contact.
    """
    if request.method == "GET":
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == "POST":
        data = JSONParser().parse(request)

        error, res = validateData(data)
        if error:
            return JsonResponse(res, status=200)

        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def contact_detail(request, id):
    """
    Retrieve, update or delete an contact.
    """
    try:
        contact = Contact.objects.get(id=id)
    except Contact.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = ContactSerializer(contact)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = JSONParser().parse(request)

        error, res = validateData(data)
        if error:
            return JsonResponse(res, status=204)

        serializer = ContactSerializer(contact, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        contact.delete()
        return HttpResponse(status=204)


@csrf_exempt
def deleteAll(request):
    Contact.objects.all().delete()
    return HttpResponse(status=204)
