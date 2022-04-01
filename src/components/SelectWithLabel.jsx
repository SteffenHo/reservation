import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import './form.css'

export const SelectWithLabel = ({
    controlId,
    labelText,
    options,
    onChange,
    value
}) => {
    return (
        <Form.Group controlId={controlId} className="input">
            <Form.Label>
                {labelText}
            </Form.Label>
            <Select options={options} onChange={onChange} value={options[value]} />
        </Form.Group>
    );
}