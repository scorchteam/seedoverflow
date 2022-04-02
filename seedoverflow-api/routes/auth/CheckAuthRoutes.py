from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.User import User
from resources.response.error.UserError import UserNotFoundError
from resources.response.error.Error import Error
from resources.response.success.AuthSuccess import UserIsAuthenticated
from db import db

class CheckAuthApi(Resource):
    @jwt_required()
    def get(self):
        try:
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            return UserIsAuthenticated().GetSuccess()
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()