from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Question, Answer, Tag
from app.forms import NewQuestionForm, EditQuestionForm
from app.models.answer import Answer

question_routes = Blueprint('questions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all questions
@question_routes.route("/")
@login_required
def get_questions():
    questions = Question.query.all()
    return {
        "questions": [question.to_dict() for question in questions],
    }

# Add a new question
@question_routes.route("/new", methods=["POST"])
@login_required
def new_question():
    """
    Create a new question
    """
    form = NewQuestionForm()
    print("........", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        content = form.data["content"]
        tag_id = form.data["tag_id"]
        new_question = Question(owner_id=user_id, content=content, tag_id=tag_id)
        
        db.session.add(new_question)
        db.session.commit()
        
        return {
            "question": new_question.to_dict(),
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get/Edit a question
@question_routes.route("/<int:question_id>", methods=["GET", "PUT"])
@login_required
def edit_question(question_id):
    if request.method == "GET":
        question = Question.query.get(question_id)
        answers = Answer.query.filter(Answer.question_id == question_id).all()

        return {
            "question": question.to_dict(),
            "answers": [answer.to_dict() for answer in answers],
        }

    if request.method == "PUT":
        form = EditQuestionForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            question = Question.query.get(question_id)
            question.content = form.data["content"]
            question.tag_id = form.data["tag_id"]
            if form.data["owner_id"]:
                question.owner_id = form.data["owner_id"]
            
            db.session.commit()

            return {"question": question.to_dict()}

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    return {"errors": "invalid method"}

# Delete a question 


