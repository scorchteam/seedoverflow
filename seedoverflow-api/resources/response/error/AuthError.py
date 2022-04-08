from resources.response.error.Error import Error

class InvalidAuthFieldValueError(Error):
    def __init__(self, status_code="403", description="Request contains invalid auth field value", fields={}):
        self.status_code = status_code
        self.description = {
            'Description': description,
            'FieldErrors': fields
        }
        self.title = self.__class__.__name__