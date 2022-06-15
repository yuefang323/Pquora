import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as answersActions from "../../store/answers";

const EditAnswer = ({ setShowModal, answerId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { questionId } = useParams();
    const user = useSelector((state) => state.session.user);
    const answers = useSelector((state) => state.answers);
    const questions = useSelector((state) => state.questions);
    const curAnswer = answers[answerId];
    const curQuestion = questions[questionId];
    const [content, setContent] = useState(curAnswer.content);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const validateErrors = [];
        if (content.length < 3 || content.length > 5000)
            validateErrors.push(
                "Answer content must be between 3 and 5000 characters."
            );
        if (curAnswer.content === content.toLowerCase().trim())
            validateErrors.push("The updated answer should be different.");
        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }
        const updateAnswer = { content, id: answerId };
        dispatch(answersActions.editAnswer(updateAnswer));
        dispatch(answersActions.getAnswer(answerId));
        setContent("");

        if (setShowModal) setShowModal(false);
        history.push(`/questions/${questionId}`);
    };

    const cancelButton = async (e) => {
        setErrors([]);
        if (setShowModal) setShowModal(false);
        setContent("");
    };

    return (
        <>
            <div className="add-question-modal add-questions">
                <div className="add-question-form">
                    <div className="edit-answer-title">
                        <h3 className="edit-your-answer">Edit your answer</h3>
                        <p className="session-owner">{user.username}</p>
                    </div>
                    <h2 className="form-h4">{curQuestion.content}</h2>
                    <div className="error-and-question-input">
                        <div className="error-list">
                            {errors &&
                                errors.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                        </div>
                        <form
                            className="new-question-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="add-question-input input-height answer">
                                <div className="input-field">
                                    <textarea
                                        type="text"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        className="textarea-content"
                                    />
                                </div>
                            </div>
                            <div className="form-buttons answer">
                                <button
                                    onClick={cancelButton}
                                    type="reset"
                                    className="cancel-add-btn edit-answer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cancel-add-btn edit-answer"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditAnswer;
