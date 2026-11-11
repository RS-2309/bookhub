from django import forms

class BookForm(forms.Form):
    title = forms.CharField(max_length=200)
    author = forms.CharField(max_length=100)
    description = forms.CharField(widget=forms.Textarea)