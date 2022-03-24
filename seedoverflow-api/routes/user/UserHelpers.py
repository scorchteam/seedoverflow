from flask_jwt_extended import get_jwt_identity
from db import db
from models.UserModel import User
from resources.error import Error, UserNotFoundError

def GetUserByEmail():
    try:
        user_email = get_jwt_identity()
        user = db.session.get(User, user_email)
        return user
    except Exception as e:
        raise