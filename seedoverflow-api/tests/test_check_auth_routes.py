import json
from routes.routes import base_url
from tests.test_base import TestBase

class CheckUserAuthTestCase(TestBase):

    def test_check_auth_returns_valid(self):
        self.register_user()
        login_res = self.login_user()
        result = json.loads(login_res.data)
        token = result["LoginUserSuccess"]["Token"]
        auth_res = self.check_user_auth(token=token)
        self.assertEqual(auth_res.status_code, 200)
        auth_result = json.loads(auth_res.data)
        self.assertIn("UserIsAuthenticated", auth_result)
