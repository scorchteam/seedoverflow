from flask_jwt_extended import get_jwt_identity
from db import db
from models.UserModel import User
from resources.error import Error, UserNotFoundError

def check_for_missing_required_keys(required_keys=[], provided_keys={}):
    keys_not_found = []
    if len(required_keys) == 0:
        return keys_not_found
    for key in required_keys:
        if key not in provided_keys:
            keys_not_found.append(key)
    return keys_not_found

def check_for_extra_keys(accepted_keys=[], provided_keys={}):
    extra_keys = []
    if len(accepted_keys) == 0:
        return extra_keys
    for key in provided_keys:
        if key not in accepted_keys:
            extra_keys.append(key)
    return extra_keys

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