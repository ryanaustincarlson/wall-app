from posts.models import Post
from posts.serializers import PostSerializer, UserSerializer

from django.contrib.auth.models import User

from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from posts.permissions import IsOwnerOrReadOnly

# from rest_framework.decorators import api_view, detail_route
# from rest_framework.response import Response
# from rest_framework.reverse import reverse
#
from rest_framework import viewsets


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
def get_current_user(request):
    serializer = UserSerializer(request.user, context={'request': request})
    return Response({'username': serializer.data['username']})
