import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const RoomViewModal = (props) => {
  const [show, setShow] = useState(true);

  const setShowToFalse = () => setShow(false);

  return (
    <div>
      <Modal
        show={show}
        onHide={setShowToFalse}
      >
        <Modal.Header closeButton>
          <Modal.Title>Schon teilweise reserviert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Möchtest du den Arbeitsplatz an den anderen Tagen reservieren?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" value={props.pc} onClick={props.reservaitOther}>Ja</Button>
          <Button variant="secondary" onClick={setShowToFalse}>Schließen</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}