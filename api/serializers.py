from rest_framework import serializers

from account.models import User, Follow
from activity.models import Activity
from comment.models import Comment
from deck.models import Deck


class UserSerializer(serializers.ModelSerializer):
    decks_count = serializers.ReadOnlyField(source='deck_set.count')
    followers_count = serializers.ReadOnlyField(source='follower.count')
    followings_count = serializers.ReadOnlyField(source='following.count')

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
            'decks_count',
            'followers_count',
            'followings_count',
            'last_login',
            'joined',
            'joined_since',
            'is_active',
            'is_profile_completed',
            'is_admin',
            'is_whatsapp',
            'member',
            'about',
            'picture',
            'link',
            'nationality',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data: dict):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
        )


class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'picture',
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'about',
            'picture',
            'member',
            'email',
            'link',
            'nationality',
        ]


class FollowSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True, default=serializers.CurrentUserDefault())
    following = UserMinimalSerializer(default=serializers.CurrentUserDefault())

    class Meta:
        model = Follow
        fields = [
            'user',
            'following',
        ]


class DeckSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Deck
        fields = [
            'id',
            'user',
            'name',
            'cards',
            'avg_elixir',
            'kind',
            'arena',
            'all_modes',
            'mode_1v1',
            'mode_2v2',
            'mode_2x',
            'mode_3x',
            'created',
        ]


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = [
            'issuer',
            'issued',
            'kind',
            'content',
            'created_since'
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = [
            'user',
            'comment',
            'kind',
            'target',
            'created',
            'created_since'
        ]


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
