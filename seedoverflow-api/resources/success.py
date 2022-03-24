class Success():
    def __init__(self, status_code="200", description="Success", title="Success"):
        self.status_code = status_code
        self.description = description
        self.title = title
    
    def GetError(self):
        return {self.title: self.description}, self.status_code
    
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

class DeletingUserSuccess(Success):
    def __init__(self, status_code="200", description="User deleted successfully"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class DeletingSeedSuccess(Success):
    def __init__(self, status_code="200", description="Seed deleted successfully"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class AddNewSeedSuccess(Success):
    def __init__(self, status_code="200", description="Seed added successfully"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__