#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = 'David Coldeira'
SITENAME = "dcoldeira's Lab"
SITEURL = ''

PATH = 'content'

THEME='themes/due'

TIMEZONE = 'Europe/Madrid'

DEFAULT_LANG = 'en'

MARKUP = ("md", "ipynb")

from pelican_jupyter import markup as nb_markup
PLUGINS = [nb_markup]

IGNORE_FILES = [".ipynb_checkpoints"]

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None



# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/dcoldeira'),)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
