import { useState } from "react";
import { Modal } from "../../context/Modal";

import EditAnswer from "./EditAnswer";

const EditAnswerModal = ({ answerId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-new-question-wrapper">
                <button onClick={() => setShowModal(true)}>📝 Edit</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAnswer setShowModal={setShowModal} answerId={answerId} />
                </Modal>
            )}
        </>
    );
};

export default EditAnswerModal;