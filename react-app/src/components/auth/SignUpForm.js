import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from "../../store/session";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(login("demo@aa.io", "password")).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    };

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

    // useEffect(() => {
    //     const el = document.getElementById("test1")
    //     const listen = (e) => {
    //         if(!el.contains(e.target)) {
    //             setErrors([]);
    //             setUsername("");
    //             setEmail("");
    //             setPassword("");
    //             setRepeatPassword("");
    //         }
    //     }
    //     document.addEventListener("mouseup", listen)
    //     return () => {
    //                 document.removeEventListener("mouseup", listen);
    //         	};
    // },[])

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="signup-form-container" id="test1">
            <form className="signup-form-form" onSubmit={onSignUp}>
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
                        required={true}
                    ></input>
                </div>
                <div className="form-buttons">
                    <button className="signup-btn" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
