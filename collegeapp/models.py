from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.utils import timezone


class POST(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    content_url = models.CharField(max_length=200)
    post_text = models.TextField(blank=True,null=True)
    content_type = models.CharField(max_length=10)
    no_likes = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)


class Comments(models.Model):
    post = models.ForeignKey(POST,on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    comment = models.TextField(blank=True,null=True)