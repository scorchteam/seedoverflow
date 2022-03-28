from routes.user.AuthRoutes import UserLoginApi, UserRegisterApi
from routes.user.UserRoutes import UserApi
from routes.user.CheckAuthRoutes import CheckAuthApi
from routes.seed.SeedRoutes import SeedApi, SeedIdApi, SeedsApi
from routes.user.UserTrackingRoutes import UserTrackingApi

base_url = "/api/v1"

def initalize_routes(api):
    #auth
    api.add_resource(UserRegisterApi, f"{base_url}/user/auth/register")
    api.add_resource(UserLoginApi, f"{base_url}/user/auth/login")
    api.add_resource(CheckAuthApi, f"{base_url}/user/auth/checkauth")
    #user
    api.add_resource(UserApi, f"{base_url}/user")
    api.add_resource(UserTrackingApi, f"{base_url}/user/tracking")
    #seed
    api.add_resource(SeedIdApi, f"{base_url}/seed/<id>")
    api.add_resource(SeedApi, f"{base_url}/seed")
    api.add_resource(SeedsApi, f"{base_url}/seeds")