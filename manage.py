#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    # print("-----------------")
    # print(os.environ)
    # print(os.environ["DJANGO_ENV"])
    # print("-----------------")

    # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'resourcescheduler.settings')
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src_backend.config.common_settings')
    # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src_backend.settings')
    
    # print("*************")
    # from django.conf import settings
    # print(settings.ALLOWED_HOSTS)
    # print(settings.SECRET_KEY)
    # print(os.urandom(24))


    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
