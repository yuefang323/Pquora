import { useState } from "react";
import { Modal } from "../../context/Modal";

import DeleteQuestion from "./DeleteQuestion";

const DeleteQuestionModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-trash-can fa-fw"></i>Delete
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteQuestion setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default DeleteQuestionModal;
