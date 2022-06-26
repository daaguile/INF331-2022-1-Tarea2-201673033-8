# Generated by Django 4.0.5 on 2022-06-26 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_contact_email_alter_contact_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='email',
            field=models.EmailField(max_length=255),
        ),
        migrations.AlterField(
            model_name='contact',
            name='lastName',
            field=models.CharField(max_length=25),
        ),
        migrations.AlterField(
            model_name='contact',
            name='name',
            field=models.CharField(max_length=25),
        ),
        migrations.AlterField(
            model_name='contact',
            name='phone',
            field=models.CharField(max_length=9),
        ),
        migrations.AlterField(
            model_name='contact',
            name='secondLastName',
            field=models.CharField(max_length=25),
        ),
    ]
