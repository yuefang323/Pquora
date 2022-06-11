from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Question, Answer, Tag
# from app.forms import NewQuestionForm, EditQuestionForm
# from app.models.answer import Answer
from datetime import datetime

answer_routes = Blueprint('answers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


