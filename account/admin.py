from django.contrib import admin
from django.contrib.auth.models import Group

from account.models import User, Follow


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'email',
        'is_admin',
        'is_active'
    )
    list_filter = [
        'joined',
        'is_admin',
        'is_whatsapp',
    ]
    search_fields = [
        'username',
        'email',
    ]


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'following',
    )


admin.site.unregister(Group)
