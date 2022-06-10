import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="splash-footer-wrap">
					<NavLink to="/about">About</NavLink>
                    <p className="copyright">© Copyright 2022</p>
		</footer>
	);
};

export default Footer;