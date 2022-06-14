import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from '../../store/session';
import { clearQuestions } from '../../store/questions';
import { clearAnswers } from '../../store/answers'
import ReactTooltip from "react-tooltip";


const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = async (e) => {
    dispatch(clearQuestions());
    dispatch(clearAnswers());
    await dispatch(logout());
    // dispatch()
    history.push("/");
  };

  return (
    <div className="sidebar-btn-ctrl" data-tip="Logout">
        <button
            id="logout"
            onClick={onLogout}
            className="sidebar-btn sidebar-btn-dark"
        >
            <i className="fa-solid fa-right-from-bracket fa-xl"></i>
        </button>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
    </div>
);
};

export default LogoutButton;
