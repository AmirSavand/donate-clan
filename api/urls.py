from django.conf.urls import url
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_jwt.views import obtain_jwt_token

from api.views import (
    UserViewSet,
    FollowViewSet,
    DeckViewSet,
    ActivityViewSet,
    CommentViewSet,
    UserCreateView,
    UserUpdateView,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'follows', FollowViewSet)
router.register(r'decks', DeckViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = router.urls
urlpatterns += [
    url(r'^docs/', include_docs_urls(title='Royale Clan API')),
    url(r'^auth/', obtain_jwt_token),
    url(r'^signup/', UserCreateView.as_view()),
    url(r'^settings/', UserUpdateView.as_view()),
]
