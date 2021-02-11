from django.db import models

# Create your models here.

class Comment(models.Model):
    # name = models.CharField(max_length=100, default='')
    textup = models.CharField(max_length=500, default='')
    textdown = models.CharField(max_length=500, default='')
    comment = models.CharField(max_length=500, default='')
    pub_date = models.DateTimeField('date published')