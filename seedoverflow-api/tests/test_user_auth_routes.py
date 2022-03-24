from email.mime import base
from app import create_app
from db import db
import datetime
import uuid, unittest
import json
from resources.success import RegisterUserSuccess
from models.UserModel import User
from models.SeedModel import Seed
from models.UserTrackingModel import UserTracking
from routes.routes import base_url

class UserAuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.user_data = {
            'email': 'user@domain.com',
            'password': 'password',
            'first_name': 'first',
            'last_name': 'last',
            'username': 'username'
        }
        db.drop_all()
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def register_user(self):
        return self.client().post(f'{base_url}/user/auth/register', data=json.dumps(self.user_data), content_type="application/json")
    
    def login_user(self):
        return self.client().post(f'{base_url}/user/auth/login', data=json.dumps({"email": self.user_data["email"], "password": self.user_data["password"]}), content_type="application/json")
    
    def test_registration(self):
        res = self.register_user()
        result = json.loads(res.data)
        self.assertIn("RegisterUserSuccess", result)
        self.assertEqual(res.status_code, 200)
    
    def test_registration_empty_request_body(self):
        res = self.client().post(f'{base_url}/user/auth/register', data=None)
        result = json.loads(res.data)
        self.assertIn("EmptyRequestBodyError", result)
        self.assertEqual(res.status_code, 403)

    def test_registration_missing_required_fields(self):
        res = self.client().post(f'{base_url}/user/auth/register', data=json.dumps({"random": "field"}), content_type="application/json")
        result = json.loads(res.data)
        self.assertIn("MissingRequiredFieldsError", result)
        self.assertEqual(res.status_code, 403)
        missingKeys = result["MissingRequiredFieldsError"]["MissingKeys"]
        self.assertEqual(["username", "password", "email"], missingKeys)

    def test_registration_user_already_exists(self):
        res = self.register_user()
        self.assertEqual(res.status_code, 200)
        second_res = self.register_user()
        self.assertEqual(second_res.status_code, 403)
        result = json.loads(second_res.data)
        self.assertIn("UserEmailTakenError", result)
    
    def test_registration_user_tracking_exists(self):
        close_date = datetime.datetime.utcnow()
        res = self.register_user()
        self.assertEqual(res.status_code, 200)
        user_uuid = json.loads(res.data)["RegisterUserSuccess"]["Created User"]
        usertracking_obj = UserTracking.query.filter_by(user_tracking_id=uuid.UUID(user_uuid)).first()
        self.assertIsNotNone(usertracking_obj)
        self.assertAlmostEqual(usertracking_obj.user_creation_date, close_date, delta=datetime.timedelta(3))
        self.assertIsNone(usertracking_obj.last_login_date)

    def test_login(self):
        res = self.register_user()
        self.assertEqual(res.status_code, 200)
        login_res = self.login_user()
        self.assertTrue(login_res.status_code, 200)
        result = json.loads(login_res.data)
        self.assertIn("LoginUserSuccess", result)

    def test_login_empty_request_body(self):
        res = self.client().post(f'{base_url}/user/auth/login', data=None)
        result = json.loads(res.data)
        self.assertIn("EmptyRequestBodyError", result)
        self.assertEqual(res.status_code, 403)

