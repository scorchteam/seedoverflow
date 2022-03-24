from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models.UserModel import User, UserTracking
from resources.error import Error, UserNotFoundError

class UserTrackingApi(Resource):
    @jwt_required()
    def get(self):
        try:
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            usertracking = UserTracking.query.filter_by(user_id=user.uuid).first()
            if usertracking is None:
                return 'no user tracking found'
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()