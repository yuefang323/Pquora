from flask import Blueprint, jsonify, request, json
from flask_login import current_user, login_required
from app.models import db, Question, Answer
from app.forms import NewAnswerForm, EditAnswerForm
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

# Add a new answer
@answer_routes.route("/<int:questionId>/new", methods=["POST"])
@login_required
def new_answer(questionId):
    """
    Create a new answer
    """
    form = NewAnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        content = form.data["content"]
        created_at = datetime.now()
        updated_at = datetime.now()
        
        new_answer = Answer(user_id=user_id, content=content, question_id=questionId, created_at=created_at, updated_at=updated_at)
        
        db.session.add(new_answer)
        db.session.commit()
        updatedQuestion = Question.query.get(questionId)
        updatedQuestion.updated_at = datetime.now()
        db.session.commit()
        
        return {
            "answer": new_answer.to_dict(),
            "updatedQuestion": updatedQuestion.to_dict()
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get an answer
@answer_routes.route("/<int:answerId>", methods=["GET"])
@login_required
def get_answer(answerId):
    answer = Answer.query.get(answerId)
    if answer:
        return {
            "answer": answer.to_dict(),
        }
    return {"errors": "Answer not found"}, 404

# Update an answer
@answer_routes.route("/<int:answerId>", methods=["PUT"])
@login_required
def edit_answer(answerId):
    answer = Answer.query.get(answerId)
    if answer.user_id != current_user.id:
        return {'errors': "You are not the owner of this answer."}, 401

    form = EditAnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer.content = form.data["content"]
        answer.updated_at = datetime.now()
        updatedQuestion = Question.query.get(answer.question_id)
        updatedQuestion.updated_at = datetime.now()
        db.session.commit()

        return {
                "answer": answer.to_dict(),
                "updatedQuestion": updatedQuestion.to_dict()
                }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete an answer
@answer_routes.route("/<int:answerId>", methods=["DELETE"])
@login_required
def delete_answer(answerId):

    answer = Answer.query.get(answerId)
    
    if answer: 
        if answer.user_id == current_user.id:

            db.session.delete(answer)
            db.session.commit()
            return {
                "answerId": answerId,
                "message": f"Question {answerId} was deleted successfully", 
            }

        return {'errors': ["You are not the owner of this answer."]}, 401
    return {'errors': 'Answer not found.'}, 404
