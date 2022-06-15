import { Link } from "react-router-dom";
import NavBar from "../NavBar";

const NotFound = () => {
    return (
        <>
            <NavBar />
            <div className="not-found-container">
                <div className="not-found-msg title">Page Not Found</div>
                <div className="not-found-msg">
                    We searched everywhere but couldn't find the page you were
                    looking for.
                </div>
                <div className="redirect-links">
                    {/* <Link
                        to="/"
                        exact="true"
                        className="redirect-links"
                    >
                        Go Back
                    </Link> */}
                    <Link to="/" exact="true" className="redirect-links">
                        pQuora Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
