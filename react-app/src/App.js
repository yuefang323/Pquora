import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { authenticate } from "./store/session";

import SplashPage from "./components/SplashPage"
import HomePage from "./components/HomePage";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true}>
                    {user ? <HomePage /> : <SplashPage />}
                </Route>
                <Route path="/about" exact={true}>
                    {/* <About /> */}
                </Route>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path="/" exact={true}>
                    <h1>My Home Page</h1>
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
