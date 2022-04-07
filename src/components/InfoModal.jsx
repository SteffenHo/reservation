import { Button, Modal } from "react-bootstrap";
import React, {useState} from "react";

export const InfoModal = ({
    modalHeading,
    modalBody,
    show
}) => {
    const [show, setShow] = useState(false);

    const onClose = () => setShow(false);

    if (show) {
        setShow(true);
    }

    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalHeading}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalBody}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}