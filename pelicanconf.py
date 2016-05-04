#!/usr/bin/env python3
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Masahiro Kiyota'
SITENAME = 'Juzbox.com'
SITEURL = 'www.juzbox.com'
THEME = 'themes/pelican-elegant'

PATH = 'content'
TIMEZONE = 'Asia/Tokyo'
DEFAULT_LANG = 'ja'
LOCALE = 'ja_JP'
DEFAULT_DATE_FORMAT = '%Y/%m/%d(%a)'
STATIC_EXCLUDE_SOURCES = False
ARTICLE_URL = '{date:%Y-%m-%d}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y-%m-%d}/{slug}/index.html'

# Plugins
PLUGIN_PATHS = ['plugins']
PLUGINS = ['sitemap', 'extract_toc', 'tipue_search', 'liquid_tags.img', 'liquid_tags.video', 'liquid_tags.youtube', 'liquid_tags.vimeo', 'liquid_tags.flickr']
MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'headerid', 'linkify', 'fenced_code', 'del_ins', 'tables', 'toc']

DIRECT_TEMPLATES = (('index', 'tags', 'categories','archives', 'search', '404'))
STATIC_PATHS = ['theme/images', 'static']

FLICKR_API_KEY = '63b02abd074242845f38e185a55d383a'

EXTRA_PATH_METADATA = {
    'static/robots.txt': {'path': 'robots.txt'},
    'static/CNAME': {'path': 'CNAME'}
}

SITEMAP = {
    'format': 'xml',
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    },
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    }
}

TAG_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
AUTHOR_SAVE_AS = ''

# elegant theme specific settings
LANDING_PAGE_ABOUT = {
    'title': 'Hello, world!',
    'details': 'とあるおじさんの日記兼備忘録．'
}

FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
