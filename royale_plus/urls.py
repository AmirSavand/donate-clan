from django.conf.urls import url, include
from django.contrib import admin

from api.urls import router
from royale_plus.settings import ADMIN_URL

urlpatterns = (
    url(ADMIN_URL, admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^', include('basement.urls')),
)
