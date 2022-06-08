from .db import db
from datetime import datetime

class Tag(db.Model):
    __tablename__ = 'tags'
    
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    # Tag-to-Question: one-to-many
    questions = db.relationship("Question", back_populates="tag")
    
    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }