from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from db import initialize_db, db
from routes.routes import initalize_routes
from dotenv import load_dotenv
from flask_cors import CORS
from config import app_config


def create_app(config_name="development"):
    load_dotenv(override=True)
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    # app.config['SECRET_KEY'] = "ddqwdqwdqw"

    # app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@seedoverflow-database:5432/seedoverflow"

    api = Api(app)
    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    initialize_db(app)
    initalize_routes(api)

    app.app_context().push()
    db.create_all()

    @app.route('/')
    def index():
        return 'Hello, World!'

    return app