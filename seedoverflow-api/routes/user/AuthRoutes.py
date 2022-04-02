from flask import Response, request
import datetime
from flask_restful import Resource
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import create_access_token
import string
from db import db
from models.UserModel import User, UserTracking
from resources.error import EmptyRequestBodyError, MissingRequiredFieldsError, UserEmailTakenError, UserNotFoundError, Error, ExtraFieldsError
from resources.success import LoginUserSuccess, RegisterUserSuccess
from resources.CommonHelperFunctions import check_for_extra_keys, check_for_missing_required_keys
import datetime

letters = string.ascii_lowercase

class UserRegisterApi(Resource):
    def post(self):
        request_body = request.get_json()
        if request_body is None:
            return EmptyRequestBodyError().GetError()
        try:
            required_keys = ["username", "password", "email"]
            accepted_keys = ["username", "password", "email", "first_name", "last_name"]
            keys_not_found = check_for_missing_required_keys(required_keys, request_body)
            if (len(keys_not_found) > 0):
                return MissingRequiredFieldsError(missing_keys=keys_not_found).GetError()
            extra_keys = check_for_extra_keys(accepted_keys, request_body)
            if (len(extra_keys) > 0):
                return ExtraFieldsError(extra_keys=extra_keys).GetError()
            existing_user = db.session.get(User, request_body["email"])
            if existing_user is not None:
                return UserEmailTakenError().GetError()
            user = User(**request_body)
            user_password_error = user.validate_password_strength()
            if user_password_error is not None:
                return user_password_error.GetError()
            user.hash_password()
            db.session.add(user)
            db.session.flush()
            user_id = user.uuid
            db.session.commit()
            usertracking = UserTracking.query.filter_by(user_tracking_id=user_id).first()
            if usertracking is None:
                usertracking = UserTracking(user_tracking_id=user_id)
            db.session.add(usertracking)
            db.session.commit()
            return RegisterUserSuccess(uuid=str(user_id)).GetError()
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()

class UserLoginApi(Resource):
    def post(self):
        request_body = request.get_json()
        if request_body is None:
            return EmptyRequestBodyError().GetError()
        try:
            required_keys = ["email", "password"]
            accepted_keys = ["email", "password"]
            keys_not_found = []
            for key in required_keys:
                if key not in request_body:
                    keys_not_found.append(key)
            if (len(keys_not_found) > 0):
                return MissingRequiredFieldsError(missing_keys=keys_not_found).GetError()
            extra_keys = check_for_extra_keys(accepted_keys, request_body)
            if (len(extra_keys) > 0):
                return ExtraFieldsError(extra_keys=extra_keys).GetError()
            password = request_body["password"]
            email = request_body["email"]
            user = db.session.get(User, email)
            if user is None:
                return UserNotFoundError().GetError()
            authorized = user.check_password(password)
            if not authorized:
                return UserNotFoundError().GetError()
            usertracking = UserTracking.query.filter_by(user_tracking_id=user.uuid).first()
            if usertracking is None:
                usertracking = UserTracking(user_tracking_id=user.uuid, last_login_date=datetime.datetime.utcnow())
            usertracking.last_login_date = datetime.datetime.utcnow()
            db.session.add(usertracking)
            db.session.commit()
            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.email), expires_delta=expires)
            return LoginUserSuccess(access_token=access_token).GetError()
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()