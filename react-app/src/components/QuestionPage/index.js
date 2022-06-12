import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import NavBar from "../NavBar";
import * as questionsActions from "../../store/questions";

import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import AddAnswerModal from "../AnswerPage/AddAnswerModal"
import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";

const QuestionPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    const questions = useSelector((state) => state.questions);
    const content = questions[questionId]?.content;
    const answersList = questions[questionId]?.answers
        ? questions[questionId]?.answers
        : [];
    console.log("answersList", answersList);
    const answersOrdered = answersList.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );

    const qOwnerId = questions[questionId]?.owner_id;

    useEffect(() => {
        if (questionId) {
            // dispatch(questionsActions.getQuestions())
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
                    {qOwnerId !== user.id && <AddAnswerModal />}
                    {qOwnerId === user.id && (
                        <div className="edit-and-delete-btns">
                            <EditQuestionModal />
                            <DeleteQuestionModal />
                        </div>
                    )}
                </div>
                <div className="answers-lit">
                    {answersOrdered.map((obj) => (
                        <div key={"answer" + obj.id}>
                            <NavLink
                                to={`/answers/${obj.id}`}
                                exact={true}
                                className="answer-detail"
                            >
                                <div>
                                    <p className="answer-detail">
                                        {obj.content}
                                    </p>
                                </div>
                            </NavLink>
                            <div className="time">
                                <div className="create-at-time">
                                    Created at:{" "}
                                    <CreatedAt created_at={obj.created_at} />
                                </div>
                                <div className="update-at-time">
                                    Updated at:{" "}
                                    <UpdatedAt updated_at={obj.updated_at} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default QuestionPage;
