import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

/* Diese Component zeigt ein Inputfeld an welches nicht Kontrolliert ist. */
export const InputWithLabel = (props) => {
    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>
                {props.labelText}
            </Form.Label>
            {props.min != ''
            ? <Form.Control type={props.type} onChange={props.onChange} min={props.min} required/>
            : <Form.Control type={props.type} onChange={props.onChange} required/>}
        </Form.Group>
    );
}