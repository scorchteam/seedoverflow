from resources.response.error.Error import Error

class UserTrackingNotFound(Error):
    def __init__(self, status_code="403", description="User tracking not found"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__