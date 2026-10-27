from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from .models import User

# Create your views here.

def register(request):
    if request.method == "GET":
        return render(request, "users/register.html")
    
    if request.method == "POST":
        user = User.objects.create_user(
            username = request.POST.get("username"),
            first_name = request.POST.get("first_name"),
            last_name = request.POST.get("last_name"),
            email = request.POST.get("email"),
            password = request.POST.get("password"),
            display_name = request.POST.get("display_name"),
            #date_of_birth = request.POST.get("date_of_birth")
            )

        login(request, user)

        return redirect("core:home")

def login_user(request):
    if request.method == "GET":
        return render(request, "users/login.html")

    if request.method == "POST":
        identifier = request.POST.get("identifier")
        password = request.POST.get("password")

        user = User.objects.filter(
            username = identifier
        ).first()

        if user is None:
            user = User.objects.filter(
                email = identifier
            ).first()

        if user is not None:
            user = authenticate(
                request,
                username = user.username,
                password = password
            )

        if user is not None:
            login(request, user)

            return redirect("core:home")

        else:
            messages.error(request, "Invalid username/email or password")
            return render(request, "users/login.html")

@login_required
def logout_user(request):
    logout(request)
    return redirect("core:home")

@login_required
def profile(request):
    return render(request, "users/profile.html")