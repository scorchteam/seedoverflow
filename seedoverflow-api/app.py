from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from db import initialize_db
from routes.routes import initalize_routes
from dotenv import load_dotenv

load_dotenv(override=True)

app = Flask(__name__)
app.config['SECRET_KEY'] = "ddqwdqwdqw"

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/seedoverflow"

api = Api(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

initialize_db(app)
initalize_routes(api)

@app.route('/')
def index():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run()