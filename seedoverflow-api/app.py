from flask import Flask
import uuid
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.dialects.postgresql import UUID
from dotenv import load_dotenv

load_dotenv(override=True)

app = Flask(__name__)
app.config['SECRET_KEY'] = "ddqwdqwdqw"

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/seedoverflow"

db = SQLAlchemy(app)

@app.route('/')
def index():
    return 'Hello, World!'

class User(db.Model):
    __tablename__ = 'user'
    uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(320), unique=True, nullable=False)
    first_name = Column(String(64))
    last_name = Column(String(64))
    username = Column(String(32), nullable=False)
    password = Column(String, nullable=False)

if __name__ == "__main__":
    app.run()