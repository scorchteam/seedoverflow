from tests.test_base import TestBase
from db import db
from routes.routes import base_url
import json

class TestSeedRoutes(TestBase):

    def test_post_seed(self):
        token = self.setup_user_and_get_token()
        seed_res = self.post_seed(token)
        self.assertEqual(seed_res.status_code, 200)
        seed_result = json.loads(seed_res.data)
        raw_seed = seed_result["AddNewSeedSuccess"]["Created Seed"]
        self.assertEqual(raw_seed, self.seed_data["seed"])

    def test_post_seed_empty_request_body(self):
        token = self.setup_user_and_get_token()
        res = self.post_empty_body(route="/seed", token=token)
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("EmptyRequestBodyError", res_data)

    def test_post_seed_missing_required_keys(self):
        token = self.setup_user_and_get_token()
        res = self.client().post(f'{base_url}/seed', data=json.dumps({}), content_type="application/json", headers=self.create_auth_header(token))
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("MissingRequiredFieldsError", res_data)
        self.assertIn("seed", res_data["MissingRequiredFieldsError"]["MissingKeys"])

    def test_post_seed_extra_fields(self):
        token = self.setup_user_and_get_token()
        res = self.client().post(f'{base_url}/seed', data=json.dumps({'seed': self.seed_data["seed"], 'extra': 'extra'}), content_type="application/json", headers=self.create_auth_header(token))
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("ExtraFieldsError", res_data)
        self.assertIn("extra", res_data["ExtraFieldsError"]["ExtraKeys"])

    def test_post_dup_seed(self):
        token = self.setup_user_and_get_token()
        self.post_seed(token)
        res = self.post_seed(token)
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("SeedAlreadyDefinedError", res_data)

    def test_post_seed_user_not_found(self):
        token = self.setup_user_and_get_token()
        self.delete_user(token)
        res = self.post_seed(token)
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("UserNotFoundError", res_data)
    
class TestSeedsRoutes(TestBase):
    def test_get_seeds(self):
        token = self.setup_user_and_get_token()
        self.post_seed(token=token)
        self.post_secondary_seed(token=token)
        seed_res = self.get_seeds(token=token)
        self.assertEqual(seed_res.status_code, 200)
        seed_data = json.loads(seed_res.data)
        self.assertIn("GetSeedsSuccess", seed_data)
        seeds = seed_data["GetSeedsSuccess"]["Seeds"]
        self.assertCountEqual([{"seed": self.seed_data["seed"]}, {"seed": self.secondary_seed_data["seed"]}], seeds)

    def test_get_seeds_user_not_found(self):
        token = self.setup_user_and_get_token()
        self.post_seed(token=token)
        self.delete_user(token=token)
        seed_res = self.get_seeds(token=token)
        self.assertEqual(seed_res.status_code, 403)
        seed_data = json.loads(seed_res.data)
        self.assertIn("UserNotFoundError", seed_data)

    def test_get_seeds_empty_result(self):
        token = self.setup_user_and_get_token()
        seed_res = self.get_seeds(token=token)
        self.assertEqual(seed_res.status_code, 200)
        seed_data = json.loads(seed_res.data)
        self.assertEqual([], seed_data["GetSeedsSuccess"]["Seeds"])

class TestSeedIdRoutes(TestBase):

    def test_get_seed(self):
        token = self.setup_user_and_get_token()
        self.post_seed(token)
        res = self.get_seed(seed_id=self.seed_data["seed"])
        self.assertEqual(res.status_code, 200)
        res_data = json.loads(res.data)
        self.assertIn("seed", res_data)
        self.assertIn("submitted_by", res_data)
        self.assertEqual(res_data["seed"], self.seed_data["seed"])

    def test_get_invalid_large_seed(self):
        res = self.get_seed('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("InvalidSeedError", res_data)

    def test_get_invalid_non_numerical_seed(self):
        res = self.get_seed('&')
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("InvalidSeedError", res_data)

    def test_get_seed_not_found(self):
        res = self.get_seed('badseed')
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("SeedNotFoundError", res_data)

    def test_delete_seed(self):
        token = self.setup_user_and_get_token()
        post_res = self.post_seed(token)
        self.assertEqual(post_res.status_code, 200)
        res = self.delete_seed(token=token, seed_id=self.seed_data["seed"])
        self.assertEqual(res.status_code, 200)
        res_data = json.loads(res.data)
        self.assertIn("DeletingSeedSuccess", res_data)

    def test_delete_seed_invalid_blank_seed(self):
        token = self.setup_user_and_get_token()
        res = self.delete_seed(token=token, seed_id=" ")
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("InvalidSeedError", res_data)

    def test_delete_seed_invalid_large_seed(self):
        token = self.setup_user_and_get_token()
        res = self.delete_seed(token=token, seed_id="dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("InvalidSeedError", res_data)

    def test_delete_seed_invalid_non_numerical_seed(self):
        token = self.setup_user_and_get_token()
        res = self.delete_seed(token=token, seed_id="&")
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("InvalidSeedError", res_data)

    def test_delete_not_owned_by_user(self):
        token = self.setup_user_and_get_token()
        self.post_seed(token=token)
        secondary_token=self.setup_secondary_user_and_get_token()
        res = self.delete_seed(token=secondary_token, seed_id=self.seed_data["seed"])
        self.assertEqual(res.status_code, 403)
        res_data = json.loads(res.data)
        self.assertIn("InvalidAccessToSeedError", res_data)