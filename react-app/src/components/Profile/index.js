import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import NavBar from "../NavBar";

function User() {
    // const [user, setUser] = useState({});
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const questions = useSelector(state => state.questions)
    console.log(questions)


    // useEffect(() => {
    //     if (!userId) {
    //         return;
    //     }
    //     (async () => {
    //         const response = await fetch(`/api/users/${userId}`);
    //         const user = await response.json();
    //         setUser(user);
    //     })();
    // }, [userId]);

    if (!user) return <Redirect to="/" />;

    return (
        <div className="home-page-wrapper">
            <NavBar />
            <div className="questions-list-content">
                <ul>
                    <li>
                        <strong>User Id</strong> {userId}
                    </li>
                    <li>
                        <strong>Username</strong> {user.username}
                    </li>
                    <li>
                        <strong>Email</strong> {user.email}
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default User;
