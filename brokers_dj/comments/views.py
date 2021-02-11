from django.shortcuts import render, redirect, HttpResponse
from .models import Comment
import logging
from django.utils import timezone

# Get an instance of a logger
logger = logging.getLogger(__name__)

def index(request):
    comments = Comment.objects.all().order_by('-pub_date')
    context = {
        'comments': comments,
    }
    return render(request, "brokers.html", context)

def get_name(request):
    if request.method == 'POST':
        # title = request.POST.get('name')
        textup__ = request.POST.get('textUp')
        textdown__ = request.POST.get('textDown')
        description = request.POST.get('comment')
        Comment.objects.create(
            # name = title,
            comment = description,
            textup = textup__,
            textdown = textdown__,
            pub_date = timezone.now()
        )
        return redirect("/")
    return HttpResponse("403")