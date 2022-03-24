from app import app
from db import db
from models.UserModel import User
from models.SeedModel import Seed

app.app_context().push()
db.create_all()

email = "testuser@user.com"

user = User(email=email, password="password", first_name="user", last_name="last", username="testuser")

db.session.add(user)
db.session.commit()

pulledUser = db.session.get(User, email)

seed1 = Seed(seed="ioejfiowiofjowijfoiw", submitted_by=user.uuid)
seed2 = Seed(seed="fjwoifjofnm;oiwejfwe", submitted_by=user.uuid)