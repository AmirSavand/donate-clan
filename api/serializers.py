from rest_framework import serializers

from account.models import User, Follow
from activity.models import Activity
from comment.models import Comment
from deck.models import Deck
from tournament.models import Tournament, TournamentMatch


class UserSerializer(serializers.ModelSerializer):
    decks_count = serializers.ReadOnlyField(source='deck_set.count')
    followers_count = serializers.ReadOnlyField(source='follower.count')
    followings_count = serializers.ReadOnlyField(source='following.count')
    followed_id = serializers.SerializerMethodField()

    def get_followed_id(self, obj):
        user: User = self.context['request'].user

        if not user.is_authenticated():
            return False

        try:
            follow: Follow = Follow.objects.get(following=obj, user=user)
        except Follow.DoesNotExist:
            return False

        return follow.id

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
            'email',
            'decks_count',
            'followed_id',
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
            'coins',
        )
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
        fields = (
            'id',
            'username',
            'picture',
        )


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'about',
            'picture',
            'member',
            'email',
            'link',
            'nationality',
        )


class FollowSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = (
            'user',
            'following',
        )


class FollowCreateSerializer(serializers.ModelSerializer):
    following = serializers.CharField(required=True)

    class Meta:
        model = Follow
        fields = (
            'id',
            'following',
        )

    def validate_following(self, following: str) -> str:
        try:
            following_user: User = User.objects.get(username=following)
            current_user: User = self.context['request'].user

            if current_user == following_user:
                raise serializers.ValidationError('Cannot follow yourself.')

            if Follow.objects.filter(user=current_user, following=following_user).exists():
                raise serializers.ValidationError(f'Already following {following_user.username}')

        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid user to follow.')

        return following

    def create(self, validated_data):
        following: User = User.objects.get(username=validated_data['following'])

        validated_data.update({
            'user': self.context['request'].user,
            'following': following,
        })

        return super(FollowCreateSerializer, self).create(validated_data)


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
        fields = (
            'issuer',
            'issued',
            'kind',
            'content',
            'created_since'
        )


class CommentSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = (
            'user',
            'comment',
            'kind',
            'target',
            'created',
            'created_since'
        )


class TournamentSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True, default=serializers.CurrentUserDefault())
    participants = UserMinimalSerializer(many=True, source='users', read_only=True)

    class Meta:
        model = Tournament
        fields = (
            'id',
            'name',
            'user',
            'users',
            'participants',
            'prize',
            'status',
            'created',
        )
        extra_kwargs = {
            'users': {'write_only': True},
        }

    def create(self, validated_data):
        instance = super(TournamentSerializer, self).create(validated_data)
        instance.create_tournament_matches()
        return instance


class TournamentMatchSerializer(serializers.ModelSerializer):
    player_1 = UserMinimalSerializer(read_only=True)
    player_2 = UserMinimalSerializer(read_only=True)
    player_winner = UserMinimalSerializer(read_only=True, source='winner')

    class Meta:
        model = TournamentMatch
        fields = (
            'id',
            'tournament',
            'stage',
            'player_1',
            'player_2',
            'player_winner',
            'winner',
        )
        extra_kwargs = {
            'winner': {'write_only': True},
        }


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
