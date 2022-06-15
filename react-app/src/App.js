import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import User from "./components/User";
import { authenticate } from "./store/session";

import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import QuestionPage from "./components/QuestionPage";
import QuestionsToAnswerPage from "./components/QuestionsToAnswerPage";
import About from "./components/AboutMe";
import NotFound from "./components/404Page";

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
                    <About />
                </Route>
                {/* <ProtectedRoute path="/about/pquora" exact={true}>
                    <About />
                </ProtectedRoute> */}
                <ProtectedRoute path="/questions" exact={true} loaded={loaded}>
                    <QuestionsToAnswerPage />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/questions/:questionId"
                    exact={true}
                    loaded={loaded}
                >
                    <QuestionPage />
                </ProtectedRoute>
                {/* <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute> */}
                <ProtectedRoute>
                    <NotFound />
                </ProtectedRoute>
                {/* <Route>
                    <NotFound />
                </Route> */}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
