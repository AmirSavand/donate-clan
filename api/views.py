from rest_framework import viewsets, generics
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from account.models import User, Follow
from activity.models import Activity
from api.serializers import (
    UserSerializer,
    UserUpdateSerializer,
    DeckSerializer,
    ActivitySerializer,
    CommentSerializer,
    FollowSerializer,
    FollowCreateSerializer,
)
from comment.models import Comment
from deck.models import Deck


class StandardPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    pagination_class = StandardPagination
    serializer_class = UserSerializer
    lookup_field = 'username'
    http_method_names = ('get', 'post',)


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    pagination_class = StandardPagination
    permission_classes = (IsAuthenticated,)

    def put(self, request: Request, *args, **kwargs) -> Response:
        user = request.user

        serializer = UserUpdateSerializer(
            instance=user,
            data=request.data
        )

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)

        serializer.save()
        return Response(data=serializer.data)


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    pagination_class = StandardPagination
    http_method_names = ('get', 'delete', 'post',)

    def get_queryset(self):
        queryset = super(FollowViewSet, self).get_queryset()

        user = self.request.query_params.get('user', None)
        following = self.request.query_params.get('following', None)

        if user:
            queryset = queryset.filter(user__username=user)

        if following:
            queryset = queryset.filter(following__username=following)

        return queryset

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'POST':
            serializer_class = FollowCreateSerializer

        return serializer_class


class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    filter_fields = ('user', 'kind', 'arena',)
    pagination_class = StandardPagination

    def get_queryset(self):
        queryset = super(DeckViewSet, self).get_queryset()
        user = self.request.query_params.get('user', None)

        if user is not None:
            queryset = queryset.filter(user__username=user)

        return queryset


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_fields = ('issuer', 'kind',)
    http_method_names = ('get',)
    pagination_class = StandardPagination

    def get_queryset(self):
        queryset = super(ActivityViewSet, self).get_queryset()
        issuer = self.request.query_params.get('issuer', None)

        if issuer is not None:
            queryset = queryset.filter(issuer=issuer)

        return queryset


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = StandardPagination
    filter_fields = ('user',)

    def get_queryset(self):
        queryset = super(CommentViewSet, self).get_queryset()

        user = self.request.query_params.get('user', None)
        kind = self.request.query_params.get('kind', None)
        target = self.request.query_params.get('target', None)

        if user is not None:
            queryset = queryset.filter(user__username=user)

        if kind is not None:
            queryset = queryset.filter(kind=kind)

        if target is not None:
            queryset = queryset.filter(target=target)

        return queryset
