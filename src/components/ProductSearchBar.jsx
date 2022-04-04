import React from "react";
import './form.css'
import Select from 'react-select'
import { Form } from "react-bootstrap";

export const ProductSearchBar = ({
    controlId,
    labelText,
    onChange,
    options
}) => {
    return (
        <Form.Group className="input" controlId={controlId}>
            <Form.Label>
                {labelText}
            </Form.Label>
            <Select options={options} onChange={onChange} />
        </Form.Group>
    );
}