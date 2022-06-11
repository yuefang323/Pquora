import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as questionsActions from "../../store/questions";

const DeleteQuestion = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const { questionId } = useParams();
    const questionIdNum = parseInt(questionId)
    const questions = useSelector((state) => state.questions);
    const content = questions[questionId].content;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const questionToDelete = {
            id: questionIdNum, 
            content
        };
        const res = await dispatch(
            questionsActions.deleteThisQuestion(questionToDelete)
        );

        if (!res.errors) {
            history.push(`/`);
            setShowModal(false);
            // dispatch(questionsActions.addEditQuestion(questionId))
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
            <h4 className="warning-message">
                Do you really want to delete this question? This action cannot
                be undone included in this notebook!
            </h4>
            <div> {content} </div>
            <button className="yes-button" type="submit" onClick={handleSubmit}>
                Yes
            </button>
            <button onClick={cancelButton} type="reset">
                Cancel
            </button>
        </div>
    );
};

export default DeleteQuestion;
