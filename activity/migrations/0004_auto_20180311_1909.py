# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-11 19:09
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0003_auto_20180311_1643'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='activity',
            options={'ordering': ['-id'], 'verbose_name': 'Activity', 'verbose_name_plural': 'Activities'},
        ),
    ]
