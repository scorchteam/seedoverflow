from routes.user.AuthRoutes import UserLoginApi, UserRegisterApi
from routes.user.UserRoutes import UserApi
from routes.user.CheckAuthRoutes import CheckAuthApi

base_url = "/api/v1"

def initalize_routes(api):
    api.add_resource(UserRegisterApi, f"{base_url}/user/auth/register")
    api.add_resource(UserLoginApi, f"{base_url}/user/auth/login")
    api.add_resource(UserApi, f"{base_url}/user")
    api.add_resource(CheckAuthApi, f"{base_url}/checkauth")