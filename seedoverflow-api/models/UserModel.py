from db import db
import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from flask_bcrypt import generate_password_hash, check_password_hash
import uuid
from models.SeedModel import Seed
from models.UserTrackingModel import UserTracking

class User(db.Model):
    __tablename__ = 'user'
    uuid = Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    email = Column(String(320), primary_key=True, nullable=False)
    first_name = Column(String(64))
    last_name = Column(String(64))
    username = Column(String(32), nullable=False)
    password = Column(String, nullable=False)
    seeds = relationship(Seed, cascade="all, delete")
    usertracking = relationship(UserTracking, cascade="all, delete")
    
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def get_user_object(self):
        user_object = {
            'uuid': str(self.uuid),
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username
        }
        return user_object