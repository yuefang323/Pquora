from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import answer, db, User, Question

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('')
@login_required
def users():
    """
    Gets all users
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# Get current login user's all questions, answers, and tags
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    questions = [question.to_dict() for question in user.questions]
    answers = [answer.to_dict() for answer in user.answers]

    return {
        "questions": questions,
        "answers": answers
    }


