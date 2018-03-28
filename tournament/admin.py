from django.contrib import admin

from tournament.models import Tournament, TournamentMatch


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'prize',
        'created',
    )
    search_fields = (
        'name',
        'prize',
        'created',
    )


@admin.register(TournamentMatch)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'tournament',
        'player_1',
        'player_2',
        'winner',
    )
