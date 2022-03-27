from app import create_app
from db import db
import datetime
import uuid, unittest
from models.UserModel import User
from models.SeedModel import Seed
from models.UserTrackingModel import UserTracking
from tests.test_base import TestBase

class ModelTestCase(TestBase):

    def test_user_model(self):
        test_user = User(**self.user_register_data)
        test_user.hash_password()
        self.assertEqual(test_user.email, self.user_register_data["email"])
        self.assertEqual(test_user.username, self.user_register_data["username"])
        self.assertEqual(test_user.first_name, self.user_register_data["first_name"])
        self.assertEqual(test_user.last_name, self.user_register_data["last_name"])
        self.assertNotEqual(test_user.password, self.user_register_data["password"])
    
    def test_seed_model(self):
        test_seed = Seed(**self.seed_data)
        self.assertEqual(test_seed.seed, self.seed_data["seed"])
    
    def test_user_tracking_model(self):
        user_tracking = UserTracking(**self.usertracking_data)
        self.assertEqual(user_tracking.user_tracking_id, self.usertracking_data["user_tracking_id"])
        self.assertAlmostEqual(user_tracking.user_creation_date, self.usertracking_data["user_creation_date"])
        self.assertAlmostEqual(user_tracking.last_login_date, self.usertracking_data["last_login_date"])