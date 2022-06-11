import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";


const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(login("demo@aa.io", "password")).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
		return () => {
			setErrors([]);
			setEmail("");
            setPassword("");
		};
	}, []);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-form-container">
            <form className="login-form-form" onSubmit={onLogin}>
                <div className="error-list">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="login-input">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Your email*"
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div className="login-input">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Your password*"
                        value={password}
                        onChange={updatePassword}
                    />
                    <div className="form-buttons">
						<button className="login-btn" type="submit">Login</button>
						<button className="demo-login-btn" onClick={demoLogin}>Demo Login</button>
					</div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
