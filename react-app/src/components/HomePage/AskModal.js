import { useState } from "react";
import { Modal } from "../../context/Modal";

import AddQuestion from "../QuestionPage/AddQuestion";

const AskModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button
                    onClick={() => setShowModal(true)}
                    className="ask-answer-btn"
                    id="aa-btn"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            className="icon_svg-stroke"
                            stroke="#666"
                            strokeWidth="1.5"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g transform="translate(9 7)">
                                <path
                                    d="M3 6v-.5A2.5 2.5 0 1 0 .5 3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <circle
                                    className="icon_svg-fill_as_stroke"
                                    fill="#666"
                                    cx="3"
                                    cy="8.5"
                                    r="1"
                                    stroke="none"
                                ></circle>
                            </g>
                            <path
                                d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                    </svg>
                    <div className="ask-answer-word">Ask a Question</div>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddQuestion setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default AskModal;
