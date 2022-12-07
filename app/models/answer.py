from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Answer(db.Model):
    __tablename__ = 'answers'
    
    # add to every model file under __table_name__
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow)

   # Answer-to-User: many-to-one
    user = db.relationship("User", back_populates="answers")
    # Answer-to-Question: many-to-one
    question = db.relationship("Question", back_populates="answers")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'created_at': self.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'updated_at': self.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'user_name': self.user.username, 
        }