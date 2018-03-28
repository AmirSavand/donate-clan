from django.core import validators
from django.db import models
from django.utils.timesince import timesince

from account.models import User
from basement.utils import grouper


class TournamentStatus:
    START = 0
    FINISH = 1
    CANCEL = 2


class Tournament(models.Model):
    TOURNAMENT_STATUS_CHOICES = (
        (TournamentStatus.START, 'Start'),
        (TournamentStatus.FINISH, 'Finish'),
        (TournamentStatus.CANCEL, 'Cancel'),
    )

    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.IntegerField(choices=TOURNAMENT_STATUS_CHOICES, default=TournamentStatus.START)
    prize = models.IntegerField(default=100, validators=[
        validators.MinValueValidator(10),
        validators.MaxValueValidator(1000),
    ])
    users = models.ManyToManyField(User, related_name='tournament_participant')
    created = models.DateTimeField(auto_now_add=True, editable=False)

    @property
    def get_created_since(self):
        return timesince(self.created)

    def create_tournament_matches(self):
        for users in grouper(2, self.users.all()):
            TournamentMatch.objects.create(
                tournament=self,
                player_1=users[0],
                player_2=users[1],
            )

    def __str__(self):
        return f'{self.name} ({self.get_status_display()})'

    class Meta:
        verbose_name = 'Tournament'
        verbose_name_plural = 'Tournaments'
        ordering = ('-id',)


class TournamentMatch(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    player_1 = models.ForeignKey(User, related_name='match_player_1', on_delete=models.SET_NULL, null=True, blank=True)
    player_2 = models.ForeignKey(User, related_name='match_player_2', on_delete=models.SET_NULL, null=True, blank=True)
    winner = models.ForeignKey(User, related_name='won_matches', null=True, blank=True)

    def __str__(self):
        return f'{self.tournament}: {self.player_1} vs {self.player_2}'

    class Meta:
        verbose_name = 'Tournament Match'
        verbose_name_plural = 'Tournament Matches'
        ordering = ('-id',)
