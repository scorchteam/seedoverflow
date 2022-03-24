from app import create_app
from db import db
import datetime
import uuid, unittest
import json
from routes.routes import base_url
from tests.Common import user_register_data, user_login_data

class UserAuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.user_register_data = user_register_data
        self.user_login_data = user_login_data
        db.drop_all()
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def register_user(self, email=user_register_data["email"], password=user_register_data["password"], username=user_register_data["username"], first_name=user_register_data["first_name"], last_name=user_register_data["last_name"]):
        return self.client().post(f'{base_url}/user/auth/register', data=json.dumps({'email': email, 'password': password, 'username': username, 'first_name': first_name, 'last_name': last_name}), content_type="application/json")
    
    def login_user(self, email=user_login_data["email"], password=user_login_data["password"]):
        return self.client().post(f'{base_url}/user/auth/login', data=json.dumps({"email": email, "password": password}), content_type="application/json")
    
    def check_user_auth(self, email=user_login_data["email"], password=user_login_data["password"], token=None):
        return self.client().get(f'{base_url}/user/auth/checkauth', headers={'Authorization': f'Bearer {token}'})

    def test_check_auth_returns_valid(self):
        self.register_user()
        login_res = self.login_user()
        result = json.loads(login_res.data)
        token = result["LoginUserSuccess"]["Token"]
        auth_res = self.check_user_auth(token=token)
        self.assertEqual(auth_res.status_code, 200)
        auth_result = json.loads(auth_res.data)
        self.assertIn("UserIsAuthenticated", auth_result)
