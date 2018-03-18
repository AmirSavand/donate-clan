from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.validators import ASCIIUsernameValidator, UnicodeUsernameValidator
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import six
from django.utils.timesince import timesince


class UserManager(BaseUserManager):
    def create_user(self, username: str, password: str, email: str):
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username: str, password: str, email: str):
        user = self.create_user(username=username, password=password, email=email)
        user.is_staff = True
        user.is_active = True
        user.save()

        return user


class User(AbstractBaseUser):
    username_validator = UnicodeUsernameValidator() if six.PY3 else ASCIIUsernameValidator()

    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[username_validator],
        error_messages={'unique': 'A user with that username already exists.'},
    )

    joined = models.DateTimeField(auto_now=True)
    email = models.EmailField(max_length=254, unique=True)
    member = models.CharField(max_length=50, default=None, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_whatsapp = models.BooleanField(default=False)

    about = models.CharField(max_length=500, default=None, null=True, blank=True)
    picture = models.URLField(default=None, null=True, blank=True)
    link = models.URLField(default=None, null=True, blank=True)
    nationality = models.CharField(max_length=50, default=None, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = [
        'email',
    ]

    @property
    def joined_since(self) -> str:
        return timesince(self.joined)

    @property
    def is_profile_completed(self) -> bool:
        return all([self.about, self.picture, self.nationality])

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def get_username(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-id']


class Follow(models.Model):
    user = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.user == self.following:
            raise ValidationError("Users cannot follow themselves.")
        super(Follow, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username} follows {self.following.username}'

    class Meta:
        verbose_name = 'Follow'
        verbose_name_plural = 'Follows'
        ordering = ['-id']
        unique_together = ('user', 'following',),
