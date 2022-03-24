import os

class Config(object):
    DEBUG = False
    SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@seedoverflow-database:5432/seedoverflow'

class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@seedoverflow-database:5432/test'

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig
}