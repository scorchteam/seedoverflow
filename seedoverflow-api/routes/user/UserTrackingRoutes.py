from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models.User import User, UserTracking
from resources.response.error.Error import Error
from resources.response.error.UserError import UserNotFoundError
from resources.response.error.UserTrackingError import UserTrackingNotFound

class UserTrackingApi(Resource):
    @jwt_required()
    def get(self):
        try:
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            usertracking = UserTracking.query.filter_by(user_tracking_id=user.uuid).first()
            if usertracking is None:
                return UserTrackingNotFound().GetError()
            return usertracking.get_user_tracking()
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()