from resources.response.success.Success import Success

class DeletingUserSuccess(Success):
    def __init__(self, status_code="200", description="User deleted successfully"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__