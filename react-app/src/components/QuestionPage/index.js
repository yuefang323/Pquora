import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../NavBar";
import * as answerActions from "../../store/answers";
import * as questionsActions from "../../store/questions";

import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import AddAnswerModal from "../AnswerPage/AddAnswerModal";
import EditAnswerModal from "../AnswerPage/EditAnswerModal"
import DeleteAnswerModal from "../AnswerPage/DeleteAnswerModal"
import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";

const QuestionPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const { questionId } = useParams();
    const questions = useSelector((state) => state.questions);
    const answers = useSelector((state) => state.answers);
    const questionContent = questions[questionId]?.content;
    const answersList = Object.values(answers);
    const answersOrdered = answersList.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );
    const qOwnerId = questions[questionId]?.owner_id;

    useEffect(() => {
        if (questionId) {
            // dispatch(answerActions.clearAnswers())
            dispatch(answerActions.getAnswersFromAQuestion(questionId));
        }
        dispatch(questionsActions.getQuestion(questionId));
    }, [questionId, dispatch]);

    return (
        <div className="question-page-wrapper">
            <NavBar />
            <div className="single-question-info">
                <h2 className="a-question-content">{questionContent}</h2>
                <div className="edit-question-btn">
                    {qOwnerId !== user?.id && <AddAnswerModal />}
                    {qOwnerId === user?.id && (
                        <div className="edit-and-delete-btns">
                            <EditQuestionModal />
                            <DeleteQuestionModal />
                        </div>
                    )}
                </div>
                <div className="answers-lit">
                    {answersOrdered.map((obj) => (
                        <div key={"answer" + obj.id}>
                            <div>
                                <p className="answer-detail">{obj.content}</p>
                                {obj.user_id === user.id && (
                                    <div className="edit-delete-answer-btns">
                                        <EditAnswerModal answerId={obj.id}/>
                                        <DeleteAnswerModal answerId={obj.id} />
                                    </div>
                                )}
                            </div>

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
