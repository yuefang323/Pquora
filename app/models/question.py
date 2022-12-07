from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'
    
    # add to every model file under __table_name__
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow)

    # Question-to-User: many-to-one
    user = db.relationship("User", back_populates="questions")
    # Question-to-Answer: one-to-many
    answers = db.relationship("Answer", back_populates="question", cascade="all, delete")   
    # Question-to-Tag: many-to-one
    tag = db.relationship("Tag", back_populates="questions")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'owner_id': self.owner_id,
            'tag_id': self.tag_id,
            'created_at': self.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'updated_at': self.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'owner_name': self.user.username, 
        }