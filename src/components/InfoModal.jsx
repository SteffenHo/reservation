import { Button, Modal } from "react-bootstrap";
import React, {useState} from "react";

export const InfoModal = ({
    modalHeading,
    modalBody,
    showModal,
    onClose
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        onClose();
    }

    if (showModal) {
        setShow(true);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalHeading}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalBody}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}