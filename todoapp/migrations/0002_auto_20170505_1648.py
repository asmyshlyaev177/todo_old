# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-05 16:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]
