import { useState } from "react";
import { Modal } from "../../context/Modal";

import EditQuestion from "./EditQuestion";

const EditQuestionModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button onClick={() => setShowModal(true)} className="edit-btn">
                    📝 Edit
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
