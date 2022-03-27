from asyncore import file_dispatcher
from flask_restful import Resource, request
from flask import jsonify
from models.SeedModel import Seed
from models.UserModel import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.error import EmptyRequestBodyError, Error, ExtraFieldsError, InvalidAccessToSeedError, InvalidSeedError, MissingRequiredFieldsError, SeedNotFoundError, UserNotFoundError, SeedAlreadyDefinedError
from resources.CommonHelperFunctions import check_for_extra_keys, check_for_missing_required_keys
from resources.success import DeletingSeedSuccess, AddNewSeedSuccess
from db import db
from resources.CommonHelperFunctions import validate_seed

required_seed_post_body_keys = ["seed"]

class SeedApi(Resource):
    @jwt_required()
    def post(self):
        try:
            request_body = request.get_json()
            if request_body is None:
                return EmptyRequestBodyError().GetError()
            accepted_keys = ["seed"]
            keys_not_found = check_for_missing_required_keys(required_seed_post_body_keys, request_body)
            if (len(keys_not_found) > 0):
                return MissingRequiredFieldsError(missing_keys=keys_not_found).GetError()
            extra_keys = check_for_extra_keys(accepted_keys, request_body)
            if len(extra_keys) > 0:
                return ExtraFieldsError(extra_keys=extra_keys).GetError()
            check_for_dup_seed = Seed.query.filter_by(seed=request_body["seed"]).first()
            if check_for_dup_seed is not None:
                return SeedAlreadyDefinedError().GetError()
            userObj = db.session.get(User, get_jwt_identity())
            if userObj is None:
                return UserNotFoundError().GetError()
            new_seed = Seed(**request_body)
            new_seed.submitted_by = userObj.uuid
            db.session.add(new_seed)
            return AddNewSeedSuccess(seed=new_seed.seed).GetError()
        except Exception as e:
            return Error().GetError()

class SeedIdApi(Resource):
    def get(self, id):
        seed = id
        try:
            is_seed_valid = validate_seed(seed)
            if is_seed_valid is not True:
                return InvalidSeedError().GetError()
            seedObj = db.session.get(Seed, seed)
            if seedObj is None:
                return SeedNotFoundError().GetError()
            return seedObj.get_seed_object()
        except Exception as e:
            print(e, flush=True)
            return Error().GetError()
    @jwt_required()
    def delete(self, id):
        seed = id
        try:
            is_seed_valid = validate_seed(seed)
            if is_seed_valid is not True:
                return InvalidSeedError().GetError()
            user_email = get_jwt_identity()
            userObj = db.session.get(User, user_email)
            seedObj = db.session.get(Seed, seed)
            is_owned_by_user = (seedObj.submitted_by == userObj.uuid)
            if is_owned_by_user is not True:
                return InvalidAccessToSeedError().GetError()
            db.session.delete(seedObj)
            db.session.commit()
            return DeletingSeedSuccess().GetError()
        except Exception as e:
            return Error().GetError()