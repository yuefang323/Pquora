import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
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

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-background">
            <div className="login-form-container">
                <form onSubmit={onLogin}>
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                        />
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
