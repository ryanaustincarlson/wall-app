from rest_framework import serializers
from posts.models import Post

from django.contrib.auth.models import User


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    author_url = serializers.HyperlinkedIdentityField(view_name='user-detail')

    class Meta:
        model = Post
        fields = ('url', 'id', 'author', 'author_url', 'text', 'created')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = serializers.HyperlinkedRelatedField(many=True, view_name='post-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'posts')
