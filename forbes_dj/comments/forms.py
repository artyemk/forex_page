from django import forms

class CommentForm(forms.Form):
    name = forms.CharField(label='name', max_length=100)
    comment = forms.CharField(label='comment', max_length=500)