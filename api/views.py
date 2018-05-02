from django_filters.rest_framework import DjangoFilterBackend
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
    TournamentSerializer, TournamentMatchSerializer)
from comment.models import Comment
from deck.models import Deck
from tournament.models import Tournament, TournamentMatch


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
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'POST':
            serializer_class = FollowCreateSerializer

        return serializer_class


class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    pagination_class = StandardPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    http_method_names = ('get',)
    pagination_class = StandardPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = StandardPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    pagination_class = StandardPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class TournamentMatchViewSet(viewsets.ModelViewSet):
    queryset = TournamentMatch.objects.all()
    serializer_class = TournamentMatchSerializer
    pagination_class = StandardPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'
    http_method_names = ('get', 'put',)
