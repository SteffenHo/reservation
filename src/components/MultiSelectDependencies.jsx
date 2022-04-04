import React from "react";
import { Form } from "react-bootstrap";
import './form.css';
import Select from "react-select";

export const MultiSelectDependencies = ({
    controlId,
    labelText,
    onChange,
    options,
    value
}) => {
    return (
        <Form.Group className="input" controlId={controlId}>
            <Form.Label>
                {labelText}
            </Form.Label>
            <Select 
                options={options}
                value={value}
                onChange={onChange}
                isMulti
            />
        </Form.Group>
    );
}