import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            } 
        } else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    useEffect(() => {
		return () => {
			setErrors([]);
			setUsername("");
			setEmail("");
			setPassword("");
			setRepeatPassword("");
		};
	}, []);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="signup-form-container">
            <form onSubmit={onSignUp}>
                <div className="error-list">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="signup-input">
                    <label>User Name</label>
                    <input
                        type="text"
                        name="username"
                        onChange={updateUsername}
                        value={username}
                        placeholder="User name*"
                        required
                    ></input>
                </div>
                <div className="signup-input">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={updateEmail}
                        value={email}
                        placeholder="Email*"
                        required
                    ></input>
                </div>
                <div className="signup-input">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={updatePassword}
                        value={password}
                        placeholder="Password*"
                        required
                    ></input>
                </div>
                <div className="signup-input">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="repeat_password"
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        placeholder="Confirm password*"
                        required={true}
                    ></input>
                </div>
                <div className="form-buttons">
                <button className="signup-btn" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
