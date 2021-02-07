from django.db import models

# Create your models here.

class Comment(models.Model):
    name = models.CharField(max_length=100)
    comment = models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published')