from email.policy import default
from enum import unique
from tkinter import CASCADE
from db import db
import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
import json

class Seed(db.Model):
    __tablename__ = 'seed'
    seed = Column(String(64), primary_key=True)
    submitted_by = Column(UUID(as_uuid=True), ForeignKey("user.uuid"),nullable=False)
    seed_creation_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    flairs = Column(JSON, nullable=True, default=[])
    imageLinks = Column(JSON, nullable=True, default=[])

    def get_seed_object(self):
        seed_object = {
            'seed': self.seed,
            'submitted_by': str(self.submitted_by),
            'seed_creation_date': str(self.seed_creation_date),
            'flairs': self.flairs,
            'imageLinks': self.imageLinks
        }
        return seed_object
    