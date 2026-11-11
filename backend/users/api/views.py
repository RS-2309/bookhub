from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.models import User
from .serializers import UserSerializer, RegistrationSerializer

@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegistrationSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        login(request, user)

        return Response({
            "message": "Registration successful.",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET"])
@permission_classes([AllowAny])
def current_user(request):

    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)

        return Response({
            "is_authenticated": True,
            "user": serializer.data
        })

    return Response({
        "is_authenticated": False,
        "user": None
    })

@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    identifier = request.data.get("identifier")
    password = request.data.get("password")

    if not identifier or not password:
        return Response(
            {"error": "Username/email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.filter(username=identifier).first()

    if user is None:
        user = User.objects.filter(email__iexact=identifier).first()

    if user is None:
        return Response(
            {"error": "Invalid username/email or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    user = authenticate(
        request,
        username=user.username,
        password=password
    )

    if user is None:
        return Response(
            {"error": "Invalid username/email or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)

    return Response({
        "message": "Login successful.",
        "user": UserSerializer(user).data
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)

    return Response({
        "message": "Logout successful."
    })

@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([AllowAny])
def csrf_token(request):
    return Response({
        "detail": "CSRF cookie set."
    })