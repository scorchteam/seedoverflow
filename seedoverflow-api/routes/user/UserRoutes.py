from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.User import User
from resources.response.error.UserError import UserNotFoundError, DeletingUserError
from resources.response.error.CommonError import EmptyRequestBodyError, ExtraFieldsError
from resources.response.error.Error import Error
from resources.response.success.UserSuccess import DeletingUserSuccess, UserUpdateSuccess
from db import db
from models.Seed import Seed
from resources.CommonHelperFunctions import check_for_extra_keys, update_user_object,validate_user_update_fields
from resources.response.error.AuthError import InvalidAuthFieldValueError

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
    @jwt_required()
    def put(self):
        try:
            body = request.get_json()
            if body is None:
                return EmptyRequestBodyError().GetError()
            user_email = get_jwt_identity()
            user = db.session.get(User, user_email)
            if user is None:
                return UserNotFoundError().GetError()
            accepted_keys = ["username", "first_name", "last_name"]
            extra_keys = check_for_extra_keys(accepted_keys, body)
            if (len(extra_keys) > 0):
                return ExtraFieldsError(extra_keys=extra_keys).GetError()
            validate_fields = validate_user_update_fields(requestBody=body)
            if validate_fields is not None:
                return InvalidAuthFieldValueError(fields=validate_fields).GetError()
            updated_user = update_user_object(user, update_values=body)
            db.session.add(updated_user)
            db.session.commit()
            return UserUpdateSuccess().GetSuccess()
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()
            