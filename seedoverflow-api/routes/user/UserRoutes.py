from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.UserModel import User
from resources.error import UserNotFoundError, Error
from db import db

class UserApi(Resource):
    @jwt_required()
    def get(self):
        try:
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            return user.get_user_object(), 200
        except Exception as e:
            print(e)
            return Error().GetError()