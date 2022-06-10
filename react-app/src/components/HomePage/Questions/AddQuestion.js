import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as questionsActions from "../../../../../store/servers";

const AddQuestion = ({ setShowModal, onClose }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [content, setContent] = useState("");
	const [errors, setErrors] = useState([]);
    const questions = useSelector(state => state.questions)
    const questionsContents = questions.map((id) =>
		questions[id].content.toLowerCase()
	);
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const validateErrors = [];
		if (content.length < 3 || content.length > 5000)
			validateErrors.push("Question content must be between 3 and 5000 characters.");
		if (questionsContents.includes(content.toLowerCase().trim()))
			validateErrors.push("Question with same content already exists.");
		if (validateErrors.length > 0) {
			setErrors(validateErrors);
			return;
		}
		const newQuestion = { content, serverIdnum };
		const res = await dispatch(channelsActions.addNewChannel(newChannel));
		dispatch(serversActions.addEditServer(res.server));
		setName("");

		if (setShowModal) setShowModal(false);
		if (onClose) onClose();
		history.push(`/channels/${serverIdnum}/${res.channel.id}`);
	};

	const cancelButton = async (e) => {
		setErrors([]);
		if (setShowModal) setShowModal(false);
		if (onClose) onClose();
		setName("");
	};

	return (
		<>
			<div className="add-channel-modal">
				<div className="add-channel-form">
					<h2 className="form-h2">Create A Channel</h2>
					<div className="error-list">
						{errors && errors.map((error) => <div key={error}>{error}</div>)}
					</div>
					<form className="new-channel-form" onSubmit={handleSubmit}>
						<div className="add-channel-input">
							<label>CHANNEL NAME</label>
							<div className="input-field">
								<div className="input-hash-sign">#</div>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>
						<div className="form-buttons">
							<button onClick={cancelButton} type="reset">
								Cancel
							</button>
							<button type="submit">Add</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddChannel;