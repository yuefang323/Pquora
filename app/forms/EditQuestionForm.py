from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired,Length

class EditQuestionForm(FlaskForm):

    content = StringField("content", validators=[DataRequired() , Length(min=3, max=5000, message='Question content must be between 3 and 5000 characters.')])
    tag_id = IntegerField("tag_id")
    # updated_at = DateTimeField("updated_at")
    