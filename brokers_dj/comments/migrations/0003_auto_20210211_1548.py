# Generated by Django 3.1.6 on 2021-02-11 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_comment_pub_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='textdown',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AddField(
            model_name='comment',
            name='textup',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='comment',
            name='comment',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='comment',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
