from resources.response.success.Success import Success

class RegisterUserSuccess(Success):
    def __init__(self, status_code="200", description="User created successfully", uuid=""):
        self.status_code = status_code
        self.uuid = uuid
        self.description = {"Created User": self.uuid,
                            "Description": description}
        self.title = self.__class__.__name__
        
class LoginUserSuccess(Success):
    def __init__(self, status_code="200", description="User logged in successfully", access_token=""):
        self.status_code = status_code
        self.access_token = access_token
        self.description = {"Token": self.access_token,
                            "Description": description}
        self.title = self.__class__.__name__

class UserIsAuthenticated(Success):
    def __init__(self, status_code="200", description="User is logged in"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__