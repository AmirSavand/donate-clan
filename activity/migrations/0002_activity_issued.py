# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-11 00:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='issued',
            field=models.CharField(blank=True, default=None, max_length=100, null=True),
        ),
    ]
