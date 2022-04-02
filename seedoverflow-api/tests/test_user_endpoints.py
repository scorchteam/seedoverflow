from tests.test_base import TestBase
from models.User import User
from db import db
import json

class TestUserEndpoints(TestBase):
    
    def test_get_user(self):
        self.register_user()
        true_user = User.query.filter_by(email=self.user_login_data["email"]).first()
        true_user_data = true_user.get_user_object()
        token = self.parse_user_token(self.login_user())
        user_data_res = self.get_user_data(token=token)
        self.assertEqual(user_data_res.status_code, 200)
        user_data = json.loads(user_data_res.data)
        self.assertCountEqual(true_user_data, user_data)

    def test_get_user_not_found(self):
        self.register_user()
        token = self.parse_user_token(self.login_user())
        user = db.session.get(User, self.user_login_data["email"])
        db.session.delete(user)
        db.session.commit()
        db.session.flush()
        user_data_res = self.get_user_data(token=token)
        self.assertEqual(user_data_res.status_code, 403)
        result = json.loads(user_data_res.data)
        self.assertIn("UserNotFoundError", result)

    def test_delete_user(self):
        self.register_user()
        token = self.parse_user_token(self.login_user())
        delete_res = self.delete_user(token)
        self.assertEqual(delete_res.status_code, 200)
        delete_result = json.loads(delete_res.data)
        self.assertIn("DeletingUserSuccess", delete_result)
    
    def test_delete_user_not_found(self):
        self.register_user()
        token = self.parse_user_token(self.login_user())
        user = db.session.get(User, self.user_login_data["email"])
        db.session.delete(user)
        db.session.commit()
        db.session.flush()
        delete_user_res = self.delete_user(token)
        self.assertEqual(delete_user_res.status_code, 403)
        delete_user_result = json.loads(delete_user_res.data)
        self.assertIn("UserNotFoundError", delete_user_result)
