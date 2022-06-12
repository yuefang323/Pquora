from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,Length, ValidationError
from app.models import Question

def question_exists(form, field):
    # Check if a question already exists 
    content = field.data

    question = Question.query.filter(Question.content == content.strip()).first()
    if question:
        raise ValidationError("The same question already exists.")

class EditQuestionForm(FlaskForm):
    content = StringField("content", validators=[DataRequired() , question_exists, Length(min=3, max=5000, message='Question content must be between 3 and 5000 characters.')])
    tag_id = IntegerField("tag_id")
    