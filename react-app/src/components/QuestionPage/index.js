import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../NavBar";
import * as answersActions from "../../store/answers";
import * as questionsActions from "../../store/questions";
import { useSearch } from "../../context/Query";

import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import AddAnswerModal from "../AnswerPage/AddAnswerModal";
import EditAnswerModal from "../AnswerPage/EditAnswerModal";
import DeleteAnswerModal from "../AnswerPage/DeleteAnswerModal";
import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";
import NotFound from "../404Page";

const QuestionPage = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const questionId = parseInt(useParams().questionId, 10);
    const questions = useSelector((state) => state.questions);
    const answers = useSelector((state) => state.answers);
    const questionContent = questions[questionId]?.content;
    // console.log("quesions....", questions)
    const questionOwner = questions[questionId]?.owner_name;
    const answersList = Object.values(answers);
    // const answersList = questions[questionId]?.answers;
    const answersOrdered = answersList.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );
    const { search } = useSearch();
    const [aarr, setAarr] = useState([]);

    const qOwnerId = questions[questionId]?.owner_id;
    // console.log("xxxxxx", questionContent)

    // if (!questionContent) history.push("/notfound")

    useEffect(() => {
        dispatch(questionsActions.getQuestion(questionId));
        if (questionId) {
            dispatch(answersActions.clearAnswers());
            dispatch(answersActions.getAnswersFromAQuestion(questionId));
        }
        // if (!questionContent) history.push("/notfound")
    }, [questionId, dispatch]);

    useEffect(() => {
        let newAarr = answersOrdered.filter((answer) =>
            answer.content.toLowerCase().includes(search.toLowerCase().trim())
        );
        setAarr(newAarr);
    }, [search, answers]);

    if (!questionContent)
        return (
            // <Redirect to="/not-found" />
            <NotFound />
        );
    return (
        <div className="question-page-wrapper">
            <NavBar />
            <div className="single-question-info">
                <h2 className="a-question-content">{questionContent}</h2>
                <div className="question-count-wrapper">
                    <p className="question-owner">Ask by: {questionOwner}</p>
                    {answersList.length > 1 && (
                        <p className="answers-count">
                            {answersList.length} answers
                        </p>
                    )}
                    {answersList.length === 1 && (
                        <p className="answers-count">1 answer</p>
                    )}
                    {answersList.length === 0 && (
                        <p className="answers-count">No answer yet</p>
                    )}
                </div>
                <div className="edit-delete-question-btn">
                    {qOwnerId !== user?.id && <AddAnswerModal />}
                    {qOwnerId === user?.id && (
                        <div className="edit-and-delete-btns">
                            <EditQuestionModal />
                            <DeleteQuestionModal />
                        </div>
                    )}
                </div>
                <div className="answers-lit">
                    {aarr.map((obj) => (
                        <div
                            key={"answer" + obj.id}
                            className="home-question-item"
                        >
                            <div>
                                <p className="answer-detail">{obj.content}</p>
                                <p className="question-answer-owner">
                                    Answered by: {obj.user_name}
                                </p>
                                {obj.user_id === user.id && (
                                    <div className="edit-and-delete-btns">
                                        <EditAnswerModal answerId={obj.id} />
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
