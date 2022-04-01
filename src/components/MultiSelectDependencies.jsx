import React from "react";
import { Form } from "react-bootstrap";
import './form.css';
import AsyncSelect from "react-select/async";
import { getAllProducts } from "./repo";

export const MultiSelectDependencies = ({
    controlId,
    labelText,
    selectedProduct,
    onChange
}) => {

    async function filterSelectedProduct() {
        //console.log(selectedProduct);
        //if (selectedProduct === 0) {
        //    return [];
        //}
        let products = await getAllProducts();
        return products.filter(product => product.value != selectedProduct);
    }

    return (
        <Form.Group className="input" controlId={controlId}>
            <Form.Label>
                {labelText}
            </Form.Label>
            <AsyncSelect 
                loadOptions={filterSelectedProduct}
                onChange={onChange}
                cacheOptions
                defaultOptions
                isMulti
            />
        </Form.Group>
    );
}