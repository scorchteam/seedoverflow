from app import app
from db import db
from models.UserModel import User

app.app_context().push()
db.create_all()