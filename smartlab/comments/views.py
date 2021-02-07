from django.shortcuts import render, redirect, HttpResponse
from .models import Comment
import logging
from django.utils import timezone

# Get an instance of a logger
logger = logging.getLogger(__name__)

def index(request):
    comments = Comment.objects.all()
    context = {
        'comments': comments,
    }
    return render(request, "smartlab.html", context)

def get_name(request):
    title = "Пользователь"
    if request.method == 'POST':
        # title = request.POST.get('name')
        description = request.POST.get('comment')
        Comment.objects.create(
            name = title,
            comment = description,
            pub_date = timezone.now()
        )
        return redirect("/")
    return HttpResponse("403")