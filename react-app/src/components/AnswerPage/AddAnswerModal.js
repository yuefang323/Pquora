import { useState } from "react";
import { Modal } from "../../context/Modal";

import AddAnswer from "./AddAnswer";

const AddAnswerModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button
                    onClick={() => setShowModal(true)}
                    className="answer-btn"
                >
                    💬 Answer
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddAnswer setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default AddAnswerModal;
