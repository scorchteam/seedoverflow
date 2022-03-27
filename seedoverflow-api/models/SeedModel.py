from db import db
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

class Seed(db.Model):
    __tablename__ = 'seed'
    seed = Column(String(64), primary_key=True)
    submitted_by = Column(UUID(as_uuid=True), ForeignKey("user.uuid"),nullable=False)

    def get_seed_object(self):
        seed_object = {
            'seed': self.seed,
            'submitted_by': str(self.submitted_by)
        }
        return seed_object
    