import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as questionsActions from "../../store/questions";

const DeleteQuestion = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const { questionId } = useParams();
    const questionIdNum = parseInt(questionId);
    const questions = useSelector((state) => state.questions);
    const content = questions[questionId].content;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const questionToDelete = {
            id: questionIdNum,
            content,
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
        <div className="add-question-modal delete-question">
            <h4 className="warning-message">
                Do you really want to delete this question? This action cannot
                be undone.
            </h4>
            {/* <div> Your question: {content} </div> */}
            <div className="form-buttons delete">
                <button
                    className="cancel-add-btn delete"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Yes
                </button>
                <button
                    className="cancel-add-btn delete"
                    onClick={cancelButton}
                    type="reset"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteQuestion;
