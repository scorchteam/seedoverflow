from resources.response.error.Error import Error

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