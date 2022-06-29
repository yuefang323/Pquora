
import { NavLink } from "react-router-dom";

import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";

function UserQuestions({ arr }) {
    return (
        <>
        {arr.map((obj) => (
                    <div
                        key={"userquestion" + obj.id}
                        className="home-question-item"
                    >
                        <NavLink
                            to={`/questions/${obj.id}`}
                            exact={true}
                            className="question-detail"
                        >
                            <div className="question-detail">
                                <p className="question-detail">{obj.content}</p>
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
                </>
    )
}
export default UserQuestions;