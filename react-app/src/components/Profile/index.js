import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import NavBar from "../NavBar";
import { useSearch } from "../../context/Query";
import UserQuestions from "./UserQuestions";
import UserAnswers from "./UserAnswers";

function User() {
    const user = useSelector((state) => state.session.user);
    const userId = user.id;
    const [questions, setQuestions] = useState([]);
    const questionsOrdered = questions.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );
    const [answers, setAnswers] = useState([]);
    const answersOrdered = answers.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );
    const { search } = useSearch();
    const [arr, setArr] = useState([]);
    const [aarr, setAarr] = useState([]);

    const [show, setShow] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/users/${userId}`);
            const responseData = await response.json();
            setQuestions(responseData.questions);
            setAnswers(responseData.answers);
        }
        fetchData();
    }, [userId]);
    console.log(questions, "......");
    console.log(answers, "xxxxxxxxxx");

    useEffect(() => {
        let newArr = questionsOrdered.filter((question) =>
            question.content.toLowerCase().includes(search.toLowerCase().trim())
        );
        setArr(newArr);
    }, [search, questions]);

    useEffect(() => {
        let newAarr = answersOrdered.filter((answer) =>
            answer.content.toLowerCase().includes(search.toLowerCase().trim())
        );
        setAarr(newAarr);
    }, [search, answers]);

    if (!user) return <Redirect to="/" />;

    return (
        <div className="home-page-wrapper">
            <NavBar />
            <div className="questions-list-content">
                <div className="question-box">
                    <p>Hi, {user.username}! You have</p>
                    <h2 className="box-word" onClick={() => setShow(true)}>
                        {questions.length} questions
                        {/* {questions.length} questions | {answers.length} answers */}
                    </h2>
                    <h2 className="box-word" onClick={() => setShow(true)}>
                        {answers.length} answers{" "}
                    </h2>
                </div>
                {show && <UserQuestions arr={arr} setShow={setShow} />}
                {show && <UserAnswers aarr={aarr} setShow={setShow} />}
            </div>
        </div>
    );
}
export default User;
