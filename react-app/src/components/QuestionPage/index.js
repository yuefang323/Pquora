import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../NavBar";
import * as questionsActions from "../../store/questions";

import EditQuestionModal from "./EditQuestionModal"

const QuestionPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    const questions = useSelector((state) => state.questions);
    const content = questions[questionId]?.content;
    const qOwnerId = questions[questionId]?.owner_id;

    useEffect(() => {
        if (questionId) {
            dispatch(questionsActions.getQuestion(questionId))
                // .then((res) => {
                // 	dispatch(chatsActions.getChats(res.chats));
                // })
                .catch((err) => console.log(err));
        }
    }, [questionId, dispatch]);

    return (
        <div className="question-page-wrapper">
            <NavBar />
            <div className="single-question-info">
                <h2 className="a-question-content">{content}</h2>
                <div className="edit-question-btn">
                    {qOwnerId !== user.id && (
                        <button className="answer-btn">💬 Answer</button>
                    )}
                    {qOwnerId === user.id && (
                        <div className="edit-and-delete-btns">
                            <button className="answer-btn">💬 Answer</button>
                            <EditQuestionModal />
                            <button className="delete-btn">
                                <i className="fa-solid fa-trash-can"></i>Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default QuestionPage;
