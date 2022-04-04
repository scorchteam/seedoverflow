#Base class
class Error():
    def __init__(self, status_code="500", description="InternalServerError", title="InternalServerError"):
        self.status_code = status_code
        self.description = description
        self.title = title
    
    def GetError(self):
        return {self.title: self.description}, self.status_code