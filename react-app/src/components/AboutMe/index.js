import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import pic from "../../assets/about.png";
import git from "../../assets/git-logo.png";
import linkedin from "../../assets/linkedin-logo.png";

const About = () => {
    const user = useSelector((state) => state.session.user);

    if (user) return <Redirect to="/" />;
    return (
        <div className="splash">
            <nav className="about-nav-bar">
                <NavLink exact to="/">
                    <h2 className="logo-name-text">pQuora</h2>
                </NavLink>
                <NavLink
                    className="about-btn"
                    exact
                    to="/about"
                    target="_blank"
                >
                    About
                </NavLink>
                <NavLink className="about-btn" exact to="/">
                    Home
                </NavLink>
            </nav>
            <div className="about-img">
                <img src={pic} className="about-img"></img>
            </div>
            <main className="about-ctrl">
                <div className="pquora-mission">
                    <h2>Why pQuora exists</h2>
                    <p>
                        pQuora's mission is to share and grow parents or
                        expectant parents the parenting knowledge. We want to
                        connect the people who have knowledge to the people who
                        need it, to bring together people with different
                        perspectives so they can understand each other better,
                        and to empower everyone to share their knowledge for the
                        benefit of the rest of the world.
                    </p>
                </div>
                <div className="about-card-tech-wrap">
                    <div className="about-cards">
                        <div className="about-photo">
                            <img
                                src="https://t4.ftcdn.net/jpg/02/78/70/99/360_F_278709964_PhS3MsOE9udVYb5VCin1xCQJlm3HFb9V.jpg"
                                alt="Fang"
                                className="about-photo"
                            />
                        </div>
                        <div>Fang Yue</div>
                        <div className="about-slogan">
                            Success is the sum of small efforts
                        </div>
                        <div className="about-icon-wrap">
                            <a
                                href="https://github.com/yuefang323"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={git}
                                    alt="GitHub"
                                    className="about-icon"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/fang-yue-7b3091241/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={linkedin}
                                    alt="Linked In"
                                    className="about-icon"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="about-cards"> 
                    <div className="tech-title">Technologies Used</div>
                    <li>
						<a href="https://www.docker.com/" target="_blank" rel="noreferrer">
							Docker
						</a>
					</li>
					<li>
						<a href="https://www.python.org/" target="_blank" rel="noreferrer">
							Python
						</a>
					</li>
					<li>
						<a
							href="https://flask.palletsprojects.com/en/2.1.x/"
							target="_blank"
							rel="noreferrer"
						>
							Flask
						</a>
					</li>
					<li>
						<a
							href="https://www.postgresql.org/"
							target="_blank"
							rel="noreferrer"
						>
							Postgres SQL
						</a>
					</li>
					<li>
						<a
							href="https://www.sqlalchemy.org/"
							target="_blank"
							rel="noreferrer"
						>
							SQL ALchemy
						</a>
					</li>
					<li>
						<a
							href="https://alembic.sqlalchemy.org/en/latest/"
							target="_blank"
							rel="noreferrer"
						>
							Alembic
						</a>
					</li>
					<li>
						<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
							React JS
						</a>
					</li>
					<li>
						<a href="https://redux.js.org/" target="_blank" rel="noreferrer">
							Redux
						</a>
					</li>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;
