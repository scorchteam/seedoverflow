from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.User import User
from resources.response.error.UserError import UserNotFoundError, DeletingUserError
from resources.response.error.Error import Error
from resources.response.success.UserSuccess import DeletingUserSuccess
from db import db
from models.Seed import Seed

class UserApi(Resource):
    @jwt_required()
    def get(self):
        try:
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            return user.get_user_object()
        except Exception as e:
            print(e)
            return Error().GetError()
    @jwt_required()
    def delete(self):
        try:
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            db.session.delete(user)
            db.session.commit()
            db.session.flush()
            check_user_deleted = db.session.get(User, user_email)
            if check_user_deleted is not None:
                return DeletingUserError().GetError()
            return DeletingUserSuccess().GetSuccess()
        except Exception as e:
            return Error().GetError()