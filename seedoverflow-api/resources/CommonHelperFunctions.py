import re

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

def validate_registration_fields(requestBody=None):
    error = {}
    if requestBody is None:
        return {'Error': 'Error'}
    error["username"] = validate_username_field(requestBody["username"])
    error["email"] = validate_email_field(requestBody["email"])
    error["password"] = validate_password_field(requestBody["password"])
    if "first_name" in requestBody:
        error["first_name"] = validate_name_field(requestBody["first_name"])
    if "last_name" in requestBody:
        error["last_name"] = validate_name_field(requestBody["last_name"])
    retErrors = {}
    for key in error:
        if error[key] is not None:
            retErrors[key] = error[key]
    if retErrors != {}:
        return None
    return retErrors

def validate_user_update_fields(requestBody=None):
    error = {}
    if requestBody is None:
        return {'Error': 'Error'}
    if "username" in requestBody:
        error["username"] = validate_username_field(requestBody["username"])
    if "email" in requestBody:
        error["email"] = validate_email_field(requestBody["email"])
    if "first_name" in requestBody:
        error["first_name"] = validate_name_field(requestBody["first_name"])
    if "last_name" in requestBody:
        error["last_name"] = validate_name_field(requestBody["last_name"])
    if error != {}:
        return None
    return error
    
def validate_login_fields(requestBody=None):
    error = {}
    if requestBody is None:
        return {'Error': 'Error'}
    error["email"] = validate_email_field(requestBody["email"])
    error["password"] = validate_password_field(requestBody["password"])
    retErrors = {}
    for key in error:
        if error[key] is not None:
            retErrors[key] = error[key]
    if retErrors != {}:
        return None
    return retErrors
    
def validate_username_field(username):
    if username is None:
        return "Username value doesn't exist"
    if len(username) > 32:
        return "Username must be 32 characters or less"
    if len(username) < 3:
        return "Username must be at least 3 characters long"
    if username.isalnum() is not True:
        return "Usename can only contain alphanumeric characters"
    return None
    
def validate_email_field(email):
    if email is None:
        return "Email address value doesn't exist"
    email_regex = r"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$i"
    if re.fullmatch(email_regex, email) is not True:
        return "Invalid email address"
    if len(email) > 320:
        return "Email address must be 320 characters or less"
    return None

def validate_password_field(password):
    if password is None:
        return "Password value doesn't exist"
    if len(password) > 128:
        return "Password length may not exceed 128 characters"
    if len(password) < 8:
        return "Password must be at least 8 characters long"
    if any(not c.isalnum() for c in password):
        return "Password must contain a special character"
    return None
    
def validate_name_field(name):
    if name is None:
        return None
    if name.isalnum() is not True:
        return "Name field must only contain alphanumeric characters"
    if len(name) > 64:
        return "Name field must be 64 characters or less"
    return None

def update_user_object(user, update_values=None):
    if user is None:
        return None
    if update_values is None:
        return user
    if "username" in update_values:
        user.username = update_values["username"]
    if "first_name" in update_values:
        if update_values["first_name"] == "":
            user.first_name = None
        else:
            user.first_name = update_values["first_name"]
    if "last_name" in update_values:
        if update_values["last_name"] == "":
            user.last_name = None
        else:
            user.last_name = update_values["last_name"]
    return user