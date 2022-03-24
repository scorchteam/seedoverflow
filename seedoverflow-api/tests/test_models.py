from app import create_app
from db import db
import datetime
import uuid, unittest
from models.UserModel import User
from models.SeedModel import Seed
from models.UserTrackingModel import UserTracking
from tests.Common import user_register_data

class ModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.user_data = user_register_data
        self.seed_data = {
            'seed': 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
        }
        self.usertracking_data = {
            'user_tracking_id': uuid.uuid4(),
            'user_creation_date': datetime.datetime.utcnow(),
            'last_login_date': datetime.datetime.utcnow()
        }

        with self.app.app_context():
            db.session.close()
            db.drop_all()
            db.create_all()

    def test_user_model(self):
        test_user = User(
            email=self.user_data["email"],
            first_name=self.user_data["first_name"],
            last_name=self.user_data["last_name"],
            username=self.user_data["username"],
            password=self.user_data["password"]
        )
        test_user.hash_password()
        self.assertEqual(test_user.email, self.user_data["email"])
        self.assertEqual(test_user.username, self.user_data["username"])
        self.assertEqual(test_user.first_name, self.user_data["first_name"])
        self.assertEqual(test_user.last_name, self.user_data["last_name"])
        self.assertNotEqual(test_user.password, self.user_data["password"])
        return test_user
    
    def test_seed_model(self):
        test_seed = Seed(seed=self.seed_data["seed"])
        self.assertEqual(test_seed.seed, self.seed_data["seed"])
    
    def test_user_tracking_model(self):
        user_tracking = UserTracking(
            user_tracking_id=self.usertracking_data["user_tracking_id"],
            user_creation_date=self.usertracking_data["user_creation_date"],
            last_login_date=self.usertracking_data["last_login_date"]
        )
        self.assertEqual(user_tracking.user_tracking_id, self.usertracking_data["user_tracking_id"])
        self.assertAlmostEqual(user_tracking.user_creation_date, self.usertracking_data["user_creation_date"])
        self.assertAlmostEqual(user_tracking.last_login_date, self.usertracking_data["last_login_date"])