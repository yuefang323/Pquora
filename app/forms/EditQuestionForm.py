from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

from app.models import Question

class EditQuestionForm(FlaskForm):

    owner_id = IntegerField("owner_id")
    content = StringField("content", validators=[DataRequired() , Length(min=3, max=5000, message='Question content must be between 3 and 5000 characters.')])
    tag_id = IntegerField("tag_id")