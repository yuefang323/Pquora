from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tag(db.Model):
    __tablename__ = 'tags'
    
    # add to every model file under __table_name__
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow)

    # Tag-to-Question: one-to-many
    questions = db.relationship("Question", back_populates="tag")
    
    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
            'created_at': self.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'updated_at': self.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
        }