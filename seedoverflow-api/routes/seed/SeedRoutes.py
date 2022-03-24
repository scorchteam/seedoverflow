from flask_restful import Resource, request
from flask import jsonify
from models.SeedModel import Seed
from models.UserModel import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.error import EmptyRequestBodyError, Error, InvalidAccessToSeedError, InvalidSeedError, MissingRequiredFieldsError, SeedNotFoundError, UserNotFoundError, SeedAlreadyDefinedError
from resources.CommonHelperFunctions import check_for_missing_required_keys, GetUserByEmail
from resources.success import DeletingSeedSuccess, AddNewSeedSuccess
from db import db

required_seed_post_body_keys = ["seed"]

class SeedApi(Resource):
    def get(self, seed):
        try:
            is_seed_valid = validate_seed(seed)
            if is_seed_valid is not True:
                return InvalidSeedError().GetError()
            seedObj = Seed.query.filter_by(seed=seed)
            if seedObj is None:
                return SeedNotFoundError().GetError()
            return seedObj.get_seed_object()
        except Exception as e:
            return Error().GetError()
    @jwt_required()
    def delete(self, seed):
        try:
            is_seed_valid = validate_seed(seed)
            if is_seed_valid is not True:
                return InvalidSeedError().GetError()
            user_email = get_jwt_identity()
            userObj = User.query.filter_by(email=user_email)
            seedObj = Seed.query.filter_by(seed=seed)
            is_owned_by_user = (seedObj.submitted_by == userObj.uuid)
            if is_owned_by_user is not True:
                return InvalidAccessToSeedError().GetError()
            db.session.delete(seedObj)
            db.session.commit()
            return DeletingSeedSuccess().GetError()
        except Exception as e:
            return Error().GetError()
    @jwt_required()
    def post(self):
        try:
            request_body = request.get_json()
            if request_body is None:
                return EmptyRequestBodyError().GetError()
            keys_not_found = check_for_missing_required_keys(required_keys=required_seed_post_body_keys, provided_keys=request_body)
            if (len(keys_not_found) > 0):
                return MissingRequiredFieldsError(missing_keys=keys_not_found)
            check_for_dup_seed = Seed.query.filter_by(seed=request_body["seed"]).first()
            if check_for_dup_seed is not None:
                return SeedAlreadyDefinedError().GetError()
            userObj = GetUserByEmail()
            if userObj is None:
                return UserNotFoundError().GetError()
            new_seed = Seed(**request_body)
            new_seed.submitted_by = userObj.uuid
            db.session.add(new_seed)
            return AddNewSeedSuccess().GetError()
        except Exception as e:
            return Error().GetError()

def validate_seed(seed):
    if seed is None:
        return False
    seed_len = len(seed)
    if seed_len < 1 or seed_len > 64:
        return False
    is_seed_alphanumeric = seed.isalnum()
    if is_seed_alphanumeric is not True:
        return False
    return True

def create_new_seed_obj(request_body=None, submitted_by=None):
    if request_body is None:
        return None