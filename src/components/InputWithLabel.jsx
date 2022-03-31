import React from "react";
import { Form } from "react-bootstrap";
import './form.css';

export const InputWithLabel = ({
    controlId,
    labelText
}) => {
    return (
        <Form.Group controlId={controlId} className="input">
            <Form.Label>
                {labelText}
            </Form.Label>
            <Form.Control type={"text"} />
        </Form.Group>
    )
}