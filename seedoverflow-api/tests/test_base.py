from email import header
from app import create_app
from db import db
import datetime, uuid, unittest, json
from routes.routes import base_url

user_register_data = {
    'email': 'user@domain.com',
    'password': 'password',
    'first_name': 'first',
    'last_name': 'last',
    'username': 'username'
}

user_secondary_register_data = {
    'email': 'user2@domain.com',
    'password': 'password',
    'first_name': 'first',
    'last_name': 'last',
    'username': 'username2'
}

user_login_data = {
    'email': 'user@domain.com',
    'password': 'password'
}

user_secondary_login_data = {
    'email': 'user2@domain.com',
    'password': 'password'
}

seed_data = {
    'seed': 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
}

user_tracking_data = {
    'user_tracking_id': uuid.uuid4(),
    'user_creation_date': datetime.datetime.utcnow(),
    'last_login_date': datetime.datetime.utcnow()
}

class TestBase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.user_register_data = user_register_data
        self.user_secondary_register_data = user_secondary_register_data
        self.user_login_data = user_login_data
        self.user_secondary_login_data = user_secondary_login_data
        self.seed_data = seed_data
        self.usertracking_data = user_tracking_data
        db.drop_all()
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def parse_user_token(self, response):
        response_data = json.loads(response.data)
        return response_data["LoginUserSuccess"]["Token"]

    def create_auth_header(self, token):
        return {'Authorization': f'Bearer {token}'}

    def register_user(self, email=user_register_data["email"], password=user_register_data["password"], username=user_register_data["username"], first_name=user_register_data["first_name"], last_name=user_register_data["last_name"]):
        return self.client().post(f'{base_url}/user/auth/register', data=json.dumps({'email': email, 'password': password, 'username': username, 'first_name': first_name, 'last_name': last_name}), content_type="application/json")
    
    def register_secondary_user(self, email=user_secondary_register_data["email"], password=user_secondary_register_data["password"], username=user_secondary_register_data["username"], first_name=user_secondary_register_data["first_name"], last_name=user_secondary_register_data["last_name"]):
        return self.client().post(f'{base_url}/user/auth/register', data=json.dumps({'email': email, 'password': password, 'username': username, 'first_name': first_name, 'last_name': last_name}), content_type="application/json")
    
    def login_user(self, email=user_login_data["email"], password=user_login_data["password"]):
        return self.client().post(f'{base_url}/user/auth/login', data=json.dumps({"email": email, "password": password}), content_type="application/json")

    def login_secondary_user(self, email=user_secondary_login_data["email"], password=user_secondary_login_data["password"]):
        return self.client().post(f'{base_url}/user/auth/login', data=json.dumps({"email": email, "password": password}), content_type="application/json")

    def check_user_auth(self, email=user_login_data["email"], password=user_login_data["password"], token=None):
        return self.client().get(f'{base_url}/user/auth/checkauth', headers=self.create_auth_header(token))

    def get_user_data(self, token=None):
        return self.client().get(f'{base_url}/user', headers=self.create_auth_header(token))

    def delete_user(self, token=None):
        return self.client().delete(f'{base_url}/user', headers=self.create_auth_header(token))

    def get_user_tracking(self, token=None):
        return self.client().get(f'{base_url}/user/tracking', headers=self.create_auth_header(token))

    def post_seed(self, token=None, seed=seed_data['seed']):
        return self.client().post(f'{base_url}/seed', data=json.dumps({'seed': seed}), content_type="application/json", headers=self.create_auth_header(token))

    def get_seed(self, seed_id=None):
        return self.client().get(f'{base_url}/seed/{seed_id}')

    def delete_seed(self, token=None, seed_id=None):
        return self.client().delete(f'{base_url}/seed/{seed_id}', headers=self.create_auth_header(token))
    
    def setup_user_and_get_token(self):
        self.register_user()
        return self.parse_user_token(self.login_user())

    def setup_secondary_user_and_get_token(self):
        self.register_secondary_user()
        return self.parse_user_token(self.login_secondary_user())
    
    def post_empty_body(self, route="", token=None):
        if token is not None:
            return self.client().post(f'{base_url}{route}', headers=self.create_auth_header(token))
        return self.client().post(f'{base_url}{route}')