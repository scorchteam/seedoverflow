from resources.response.success.Success import Success

class DeletingSeedSuccess(Success):
    def __init__(self, status_code="200", description="Seed deleted successfully"):
        self.status_code = status_code
        self.description = description
        self.title = self.__class__.__name__

class AddNewSeedSuccess(Success):
    def __init__(self, status_code="200", description="Seed added successfully", seed=""):
        self.status_code = status_code
        self.description = {"Created Seed": seed,
                            "Description": description}
        self.title = self.__class__.__name__

class GetSeedsSuccess(Success):
    def __init__(self, status_code="200", description="Seeds fetched successfully", seeds=[]):
        self.status_code = status_code
        self.description = {"Seeds": seeds,
                            "Description": description}
        self.title = self.__class__.__name__