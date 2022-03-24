from db import db
import datetime
from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from models.SeedModel import Seed

class UserTracking(db.Model):
    __tablename__ = 'usertracking'
    user_tracking_id = Column(UUID(as_uuid=True), ForeignKey("user.uuid"), primary_key=True, nullable=False)
    user_creation_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    last_login_date = Column(DateTime)

    def get_user_tracking(self):
        user_tracking = {
            'user_tracking_id': str(self.user_tracking_id),
            'user_creation_date': str(self.user_creation_date),
            'last_login_date': str(self.last_login_date)
        }
        return user_tracking