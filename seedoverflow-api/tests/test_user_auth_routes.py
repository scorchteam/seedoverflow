from email.mime import base
from app import create_app
from db import db
import datetime
import uuid, unittest
import json
from models.UserModel import User
from models.UserTrackingModel import UserTracking
from routes.routes import base_url
from flask_jwt_extended import decode_token
from tests.test_base import TestBase

class UserAuthTestCase(TestBase):
    
    def test_registration(self):
        res = self.register_user()
        result = json.loads(res.data)
        self.assertIn("RegisterUserSuccess", result)
        self.assertEqual(res.status_code, 200)
    
    def test_registration_valid_uuid(self):
        res = self.register_user()
        result = json.loads(res.data)
        user_uuid = result["RegisterUserSuccess"]["Created User"]
        user = User.query.filter_by(email=self.user_login_data["email"]).first()
        self.assertEqual(user_uuid, str(user.uuid))
    
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
        self.assertCountEqual(["username", "password", "email"], missingKeys)

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

    def test_registration_user_extra_fields(self):
        modified_user = self.user_register_data
        res = self.client().post(f'{base_url}/user/auth/register', data=json.dumps({'email': modified_user["email"], 'password': modified_user["password"], 'username': modified_user["username"], 'first_name': modified_user["first_name"], 'last_name': modified_user["last_name"], 'extra': "extra"}), content_type="application/json")
        self.assertEqual(res.status_code, 403)
        result = json.loads(res.data)
        self.assertIn("ExtraFieldsError", result)
        self.assertIn("extra", result["ExtraFieldsError"]["ExtraKeys"])

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

    def test_login_missing_required_fields(self):
        res = self.client().post(f'{base_url}/user/auth/login', data=json.dumps({"random": "field"}), content_type="application/json")
        result = json.loads(res.data)
        self.assertIn("MissingRequiredFieldsError", result)
        self.assertEqual(res.status_code, 403)
        missingKeys = result["MissingRequiredFieldsError"]["MissingKeys"]
        self.assertCountEqual(["password", "email"], missingKeys)

    def test_login_user_not_exists(self):
        self.register_user()
        res = self.login_user(email='fake', password='fake')
        self.assertEqual(res.status_code, 403)
        result = json.loads(res.data)
        self.assertIn("UserNotFoundError", result)

    def test_login_invalid_login_credentials(self):
        self.register_user()
        res = self.login_user(password='fakepassword')
        self.assertEqual(res.status_code, 403)
        result = json.loads(res.data)
        self.assertIn("UserNotFoundError", result)

    def test_login_valid_auth_token(self):
        self.register_user()
        res = self.login_user()
        self.assertEqual(res.status_code, 200)
        result = json.loads(res.data)
        token = result["LoginUserSuccess"]["Token"]
        user_email_check = decode_token(token)["sub"]
        self.assertEqual(user_email_check, self.user_login_data["email"])

    def test_login_user_extra_fields(self):
        modified_user = self.user_register_data
        res = self.client().post(f'{base_url}/user/auth/login', data=json.dumps({'email': modified_user["email"], 'password': modified_user["password"], 'extra': "extra"}), content_type="application/json")
        self.assertEqual(res.status_code, 403)
        result = json.loads(res.data)
        self.assertIn("ExtraFieldsError", result)
        self.assertIn("extra", result["ExtraFieldsError"]["ExtraKeys"])
