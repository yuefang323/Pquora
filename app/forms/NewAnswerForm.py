from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class NewAnswerForm(FlaskForm):
    answer = TextAreaField("answer", validators=[DataRequired(), Length(min=1, max=5000, message='Answer content must be between 1 and 5000 characters.')])
    user_id = IntegerField("tag_id")
    question_id = IntegerField("question_id")