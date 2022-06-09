from .db import db
from datetime import datetime

class Answer(db.Model):
    __tablename__ = 'answers'
    
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now)

   # Answer-to-User: many-to-one
    user = db.relationship("User", back_populates="answers")
    # Answer-to-Question: many-to-one
    question = db.relationship("Question", back_populates="answers")

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }