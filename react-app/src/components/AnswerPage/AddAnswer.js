import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as answersActions from "../../store/answers";

const AddAnswer = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { questionId } = useParams()
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const questions = useSelector((state) => state.questions);
    const curQuestion = questions[questionId].content; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const validateErrors = [];
        if (content.length < 3 || content.length > 5000)
            validateErrors.push(
                "Answer content must be between 3 and 5000 characters."
            );
        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }
        const newAnswer = { content, id: questionId };
        const res = await dispatch(
            answersActions.addNewAnswer(newAnswer)
        );
        dispatch(answersActions.addEditAnswer(res.answer));
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
                    <p>{user.username}</p>
                    <h2 className="form-h2">{curQuestion}</h2>
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
                                        placeholder='Write your answer'
                                        className="textarea-content"
                                    />
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button onClick={cancelButton} type="reset">
                                    Cancel
                                </button>
                                <button type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAnswer;