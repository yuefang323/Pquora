import { useState } from "react";
import { Modal } from "../../context/Modal";

import EditQuestion from "./EditQuestion";

const EditQuestionModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button onClick={() => setShowModal(true)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    Edit
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditQuestion setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default EditQuestionModal;
