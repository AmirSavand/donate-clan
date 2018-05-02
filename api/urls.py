from django.conf.urls import url
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_jwt.views import obtain_jwt_token

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'follows', views.FollowViewSet)
router.register(r'decks', views.DeckViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'tournaments', views.TournamentViewSet)
router.register(r'tournament-matches', views.TournamentMatchViewSet)

urlpatterns = router.urls
urlpatterns += [
    url(r'^docs/', include_docs_urls(title='Royale Clan API'), name='docs'),
    url(r'^auth/', obtain_jwt_token, name='auth'),
    url(r'^signup/', views.UserCreateView.as_view(), name='signup'),
    url(r'^settings/', views.UserUpdateView.as_view(), name='settings'),
]
