import requests
from concurrent.futures import ThreadPoolExecutor
from django.core.cache import cache
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from .forms import BookForm
from .models import Book

# Create your views here.    

def search(request):
    print("SEARCH VIEW HIT")
    print("Query:", request.GET.get("q"))

    ###
    query = request.GET.get('q', '').strip()
    books = []
    error = None

    if query:
        try:
            response = requests.get(
                "https://openlibrary.org/search.json",
                params={
                    "q": query,
                    "limit": 10,
                    "fields": 
                    (
                        "key,title,author_name,first_publish_year,cover_i,"
                        "editions,editions.key,editions.title,editions.subtitle"
                    )
                },
                timeout=10,
            )

            response.raise_for_status()
            books = response.json().get("docs", [])

        except (requests.RequestException, ValueError):
            error = "Unable to search books right now. Please try again later."

    return render(request, 'books/search.html', {
        "query": query,
        "books": books,
        "error": error
    })

#Junk Function
def addBook(request):
    return render(request, 'books/add.html', {'statement': "Enter the book details"})

#Junk Function
def displayBook(request):
    if request.method == 'POST':
        form = BookForm(request.POST)

        if form.is_valid():
            book = Book.objects.update_or_create(
                title=form.cleaned_data['title'],
                 defaults={
                    'author': form.cleaned_data['author'],
                    'description': form.cleaned_data['description'],
                }
            )

            books = Book.objects.all()

            return render(request, 'books/display.html', {'books': books})

        else:
            messages.info(request, "Your previous submission had errors. Please re-enter.")
            return redirect('add_book')

    else:
        form = BookForm()
        books = Book.objects.all()
        return render(request, 'books/display.html', {'books': books}) if books else redirect('add_book')
