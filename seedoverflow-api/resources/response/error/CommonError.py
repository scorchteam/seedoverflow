from resources.response.error.Error import Error

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

class ExtraFieldsError(Error):
    def __init__(self, status_code="403", extra_keys=[]):
        self.status_code = status_code
        self.extra_keys = extra_keys
        self.description = {"ExtraKeys": extra_keys}
        self.title = self.__class__.__name__