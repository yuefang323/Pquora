import { useState } from "react";
import { Modal } from "../../context/Modal";

import DeleteAnswer from "./DeleteAnswer";

const DeleteAnswerModal = ({ answerId }) => {
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
                    <DeleteAnswer
                        setShowModal={setShowModal}
                        answerId={answerId}
                    />
                </Modal>
            )}
        </>
    );
};

export default DeleteAnswerModal;
