from django.db.models.signals import post_save
from django.dispatch import receiver

from deck.models import Deck
from activity.models import Activity, ActivityKind


@receiver(post_save, sender=Deck)
def create_user(sender, instance, created, **kwargs):
    if created:
        Activity.objects.create(
            issuer=instance.user.username,
            issued=instance.id,
            content=f'built a {instance.avg_elixir} elixir deck',
            kind=ActivityKind.DECK,
        )
