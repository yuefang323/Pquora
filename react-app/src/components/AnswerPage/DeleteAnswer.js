import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as answersActions from "../../store/answers";

const DeleteQuestion = ({ setShowModal, answerId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const answers = useSelector((state) => state.answers);
    const curAnswer = answers[answerId]; 
    const content = curAnswer.content
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answerToDelete = {
            id: parseInt(answerId), 
            content
        };
        console.log("xxxxxx", answerToDelete)
        const res = await dispatch(
            answersActions.deleteThisAnswer(answerToDelete)
        );

        if (!res.errors) {
            setShowModal(false);
            dispatch(answersActions.addEditAnswer(answerId))
            history.push(`/questions/${curAnswer.question_id}`);
        } else {
            setErrors(res.errors);
        }
    };

    const cancelButton = async (e) => {
        setErrors([]);
        if (setShowModal) setShowModal(false);
    };

    return (
        <div className="question-delete-form">
            <h3>Your answer</h3>
            <div> {content} </div>
            <h4 className="warning-message">
                Do you really want to delete this answer? This action cannot
                be undone.
            </h4>
            <button className="yes-button" type="submit" onClick={handleSubmit}>
                Confirm
            </button>
            <button onClick={cancelButton} type="reset">
                Cancel
            </button>
        </div>
    );
};

export default DeleteQuestion;