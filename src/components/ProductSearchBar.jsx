import React from "react";
import './form.css'
import { getAllProducts } from "./repo";
import AsyncSelect from 'react-select/async'
import { Form } from "react-bootstrap";

export const ProductSearchBar = ({
    controlId,
    labelText,
    onChange
}) => {
    return (
        <Form.Group className="input" controlId={controlId}>
            <Form.Label>
                {labelText}
            </Form.Label>
            <AsyncSelect loadOptions={getAllProducts} cacheOptions defaultOptions onChange={onChange} />
        </Form.Group>
    );
}