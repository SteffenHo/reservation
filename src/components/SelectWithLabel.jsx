import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import './form.css'

export const SelectWithLabel = ({
    controlId,
    labelText,
    options
}) => {
    return (
        <Form.Group controlId={controlId} className="input">
            <Form.Label>
                {labelText}
            </Form.Label>
            <Select options={[
                {value: 1, label: "A"},
                {value: 2, label: "B"}
            ]} />
        </Form.Group>
    )
}