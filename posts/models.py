from __future__ import unicode_literals

from django.db import models


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    author = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)
