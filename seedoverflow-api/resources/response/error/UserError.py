from resources.response.error.Error import Error

class UserNotFoundError(Error):
    def __init__(self, status_code="403", description="User not found"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__
        
class UserEmailTakenError(Error):
    def __init__(self, status_code="403", description="Email already in use"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class DeletingUserError(Error):
    def __init__(self, status_code="500", description="User could not be deleted"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class NewUserPasswordStrengthError(Error):
    def __init__(self, status_code="403", description="Bad password strength", error="Bad password strength"):
        self.status_code = status_code
        self.description = {
            "Description": description,
            "Error": error
        }
        self.title = self.__class__.__name__