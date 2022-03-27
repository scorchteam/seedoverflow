from tests.test_base import TestBase
from models.UserTrackingModel import UserTracking
from models.UserModel import User
from db import db
import json

class TestUserTracking(TestBase):

    def test_user_tracking(self):
        self.register_user()
        token = self.parse_user_token(self.login_user())
        user_tracking_res = self.get_user_tracking(token=token)
        self.assertEqual(user_tracking_res.status_code, 200)
        usertracking_obj = json.loads(user_tracking_res.data)
        self.assertIn("user_tracking_id", usertracking_obj)
        self.assertIn("user_creation_date", usertracking_obj)
        self.assertIn("last_login_date", usertracking_obj)
    
    def test_user_tracking_user_not_found(self):
        self.register_user()
        token = self.parse_user_token(self.login_user())
        user = db.session.get(User, self.user_login_data["email"])
        db.session.delete(user)
        db.session.commit()
        db.session.flush()
        usertracking_res = self.get_user_tracking(token)
        self.assertEqual(usertracking_res.status_code, 403)
        usertracking_result = json.loads(usertracking_res.data)
        self.assertIn("UserNotFoundError", usertracking_result)

    def test_user_tracking_user_tracking_not_found(self):
        register_res = self.register_user()
        register_data = json.loads(register_res.data)
        user_id = register_data["RegisterUserSuccess"]["Created User"]
        token = self.parse_user_token(self.login_user())
        usertracking = db.session.get(UserTracking, user_id)
        db.session.delete(usertracking)
        db.session.commit()
        db.session.flush()
        usertracking_res = self.get_user_tracking(token=token)
        self.assertEqual(usertracking_res.status_code, 403)
        usertracking_result = json.loads(usertracking_res.data)
        self.assertIn("UserTrackingNotFound", usertracking_result)
