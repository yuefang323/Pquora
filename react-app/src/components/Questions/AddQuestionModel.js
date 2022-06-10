import { useState } from "react";
import { Modal } from "../../context/Modal";

import AddQuestion from "./AddQuestion";

const AddQuestionModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button onClick={() => setShowModal(true)}>Add question</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddQuestion setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default AddQuestionModal;
