class Error():
    def __init__(self, status_code="500", description="InternalServerError", title="InternalServerError"):
        self.status_code = status_code
        self.description = description
        self.title = title
    
    def GetError(self):
        return {self.title: self.description}, self.status_code

class EmptyRequestBodyError(Error):
    def __init__(self, status_code="403", description="Request must have a body"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__
        
class MissingRequiredFieldsError(Error):
    def __init__(self, status_code="403", missing_keys=[]):
        self.status_code = status_code
        self.missing_keys = missing_keys
        self.description = {"MissingKeys": missing_keys}
        self.title = self.__class__.__name__
        
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

class InvalidSeedError(Error):
    def __init__(self, status_code="403", description="Invalid seed provided"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class SeedNotFoundError(Error):
    def __init__(self, status_code="403", description="Seed not found"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class InvalidAccessToSeedError(Error):
    def __init__(self, status_code="403", description="You do not have access to this resource"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class SeedAlreadyDefinedError(Error):
    def __init__(self, status_code="403", description="Seed has already been added to database"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__