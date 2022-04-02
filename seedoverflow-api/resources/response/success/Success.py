#Base class
class Success():
    def __init__(self, status_code="200", description="Success", title="Success"):
        self.status_code = status_code
        self.description = description
        self.title = title
    
    def GetSuccess(self):
        return {self.title: self.description}, self.status_code