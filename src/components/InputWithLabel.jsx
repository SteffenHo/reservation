import React from "react";
import { Form } from "react-bootstrap";
import './form.css';

export const InputWithLabel = ({
    controlId,
    labelText,
    isRequired,
    onChange,
    value
}) => {
    return (
        <Form.Group controlId={controlId} className="input">
            <Form.Label>
                {labelText}
            </Form.Label>
            {isRequired ? 
            <Form.Control type="text" onChange={onChange} value={value} required /> 
            : <Form.Control type="text" onChange={onChange} value={value} />}
        </Form.Group>
    )
}