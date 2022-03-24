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

def check_for_missing_required_keys(required_keys=[], provided_keys={}):
    keys_not_found = []
    if len(required_keys) == 0:
        return keys_not_found
    for key in required_keys:
        if key not in provided_keys:
            keys_not_found.append(key)
    return keys_not_found
    