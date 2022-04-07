from flask_restful import Resource, request
from models.Seed import Seed
from models.User import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.response.error.Error import Error
from resources.response.error.CommonError import EmptyRequestBodyError, ExtraFieldsError, MissingRequiredFieldsError
from resources.response.error.SeedError import InvalidAccessToSeedError, SeedNotFoundError, SeedAlreadyDefinedError, InvalidSeedError
from resources.response.error.UserError import UserNotFoundError
from resources.CommonHelperFunctions import check_for_extra_keys, check_for_missing_required_keys
from resources.response.success.SeedSuccess import DeletingSeedSuccess, AddNewSeedSuccess, GetSeedsSuccess
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
            check_for_dup_seed = db.session.get(Seed, request_body["seed"])
            if check_for_dup_seed is not None:
                return SeedAlreadyDefinedError().GetError()
            userObj = db.session.get(User, get_jwt_identity())
            if userObj is None:
                return UserNotFoundError().GetError()
            new_seed = Seed(**request_body)
            new_seed.submitted_by = userObj.uuid
            db.session.add(new_seed)
            db.session.commit()
            return AddNewSeedSuccess(seed=new_seed.seed).GetSuccess()
        except Exception as e:
            return Error().GetError()

class SeedsApi(Resource):
    @jwt_required()
    def get(self):
        try:
            user_email = get_jwt_identity()
            userObj = db.session.get(User, user_email)
            if userObj is None:
                return UserNotFoundError().GetError()
            seeds = Seed.query.filter_by(submitted_by=userObj.uuid).all()
            seeds_raw_objs = []
            for seed in seeds:
                base_seed_obj = seed.get_seed_object()
                base_seed_obj["submitted_by_username"] = userObj.username
                seeds_raw_objs.append(base_seed_obj)
            return GetSeedsSuccess(seeds=seeds_raw_objs).GetSuccess()
        except Exception as e:
            return Error().GetError()

class RecentSeedsApi(Resource):
    def get(self, id):
        try:
            seedList = Seed.query\
                .join(User, Seed.submitted_by==User.uuid)\
                .add_columns(User.username)\
                .order_by(Seed.seed_creation_date.desc())\
                .paginate()
            for x in range(1, int(id)):
                seedList = seedList.next()
            final_seeds = []
            print(len(seedList.items), flush=True)
            for seed in seedList.items:
                new_seed = {
                    "seed": seed.Seed.seed,
                    "submitted_by": seed.username
                }
                final_seeds.append(new_seed)
            return final_seeds
        except Exception as e:
            print(e, flush=True)
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
            return DeletingSeedSuccess().GetSuccess()
        except Exception as e:
            return Error().GetError()