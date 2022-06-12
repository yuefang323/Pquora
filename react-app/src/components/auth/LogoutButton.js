import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from '../../store/session';
import { clearQuestions } from '../../store/questions';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = async (e) => {
    dispatch(clearQuestions());
    await dispatch(logout());
    // dispatch()
    history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
