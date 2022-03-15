from flask import Response, request
from flask_restful import Resource
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
import string
from db import db
from models.UserModel import User
from resources.error import EmptyRequestBodyError, MissingRequiredFieldsError, UserEmailTakenError, UserNotFoundError, Error
from resources.success import LoginUserSuccess, RegisterUserSuccess
import datetime

letters = string.ascii_lowercase

class UserRegisterApi(Resource):
    def post(self):
        request_body = request.get_json()
        if request_body is None:
            return EmptyRequestBodyError().GetError()
        try:
            required_keys = ["username", "password", "email"]
            keys_not_found = []
            for key in required_keys:
                if key not in request_body:
                    keys_not_found.append(key)
            if (len(keys_not_found) > 0):
                return MissingRequiredFieldsError(missing_keys=keys_not_found).GetError()
            user = User(**request_body)
            user.hash_password()
            db.session.add(user)
            try:
                db.session.flush()
            except IntegrityError as e:
                assert isinstance(e.orig, UniqueViolation)
                return UserEmailTakenError().GetError()
            user_id = user.uuid
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
            keys_not_found = []
            for key in required_keys:
                if key not in request_body:
                    keys_not_found.append(key)
            if (len(keys_not_found) > 0):
                return MissingRequiredFieldsError(missing_keys=keys_not_found).GetError()
            password = request_body["password"]
            email = request_body["email"]
            user = db.session.get(User, email)
            if user is None:
                return UserNotFoundError().GetError()
            authorized = user.check_password(password)
            if not authorized:
                return UserNotFoundError().GetError()
            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.email), expires_delta=expires)
            return LoginUserSuccess(access_token=access_token).GetError()
        except Exception as e:
            print(e)
            return Error().GetError()