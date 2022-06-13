import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as questionsActions from "../../store/questions";

const AddQuestion = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const questions = useSelector((state) => state.questions);
    const questionsContents = Object.values(questions).map((question) =>
        question.content.toLowerCase()
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const validateErrors = [];
        if (content.length < 3 || content.length > 5000)
            validateErrors.push(
                "Question content must be between 3 and 5000 characters."
            );
        if (questionsContents.includes(content.toLowerCase().trim()))
            validateErrors.push("Question with same content already exists.");
        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }
        const newQuestion = { content };
        const res = await dispatch(
            questionsActions.addNewQuestion(newQuestion)
        );
        dispatch(questionsActions.addEditQuestion(res.question));
        setContent("");

        if (setShowModal) setShowModal(false);
        history.push(`/`);
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
                    <h2 className="form-h2">Add Question</h2>
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
                            <div className="add-question-input input-height">
                                {/* <label>Question</label> */}
                                <div className="input-field">
                                    <textarea
                                        type="text"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        placeholder='Start your question with "What", "How", "Why", etc.'
                                        className="textarea-content"
                                    />
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button onClick={cancelButton} type="reset">
                                    Cancel
                                </button>
                                <button type="submit">Add question</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddQuestion;
