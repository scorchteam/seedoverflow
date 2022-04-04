from db import db
import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID

class Seed(db.Model):
    __tablename__ = 'seed'
    seed = Column(String(64), primary_key=True)
    submitted_by = Column(UUID(as_uuid=True), ForeignKey("user.uuid"),nullable=False)
    seed_creation_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

    def get_seed_object(self):
        seed_object = {
            'seed': self.seed,
            'submitted_by': str(self.submitted_by),
            'seed_creation_date': str(self.seed_creation_date)
        }
        return seed_object