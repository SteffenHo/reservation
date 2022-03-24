import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { InputWithLabel } from "./InputWithLabel";
import './DataForm.css'

/* Diese Component enthält ein Form zum eingenben der Daten und des Namens */
export class DataInputForm extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDateFrom = this.onChangeDateFrom.bind(this);
        this.onChangeDateTo = this.onChangeDateTo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    /* Diese Methode wird aufgerufen wenn sich der Name ändert, sie ruft MainContent.onChange auf. */
    onChangeName(event) {
        console.log("call DataInputForm onChangeName");
        let value = event.target.value;
        console.log("value:", value)
        this.props.onChange("name", value);
    }

    /* Diese Methode wird aufgerufen wenn sich das Anfangsdatum ändert, sie ruft MainContent.onChange auf. */
    onChangeDateFrom(event) {
        console.log("call DataInputForm onChangeDateFrom");
        let value = event.target.value;
        console.log("date from:", value);
        this.props.onChange("dateFrom", value);
    }

    /* Diese Methode wird aufgerufen wenn sich das Enddatum ändert, sie ruft MainContent.onChange auf. */
    onChangeDateTo(event) {
        console.log("call DataInputForm onChangeDateTo");
        let value = event.target.value;
        console.log("date to:", value);
        this.props.onChange("dateTo", value);
    }

    /* Diese Methode wird aufgerufen wenn man auf den Ok-Knopf drückt, sie unterbindet das neuladen und ruft 
    MainContent.onSubmitDataInput auf. */
    onSubmit(event) {
        console.log("call DataInputFrom onSubmit")
        this.props.onSubmit();
        event.preventDefault();
    }

    render() {
        let today = new Date().toISOString().split("T")[0];
        console.log("Today:", today)
        let minTo = this.props.dateFromValue != '' ? this.props.dateFromValue : today;
        return (
            <Form className='form' onSubmit={this.onSubmit}>
                <Row className='half-width'>
                    <InputWithLabel 
                        controlId="dateFrom" 
                        labelText="Vom" 
                        type="date" 
                        onChange={this.onChangeDateFrom}
                        min={today}
                    />
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel 
                            controlId="dateTo" 
                            labelText="Bis" 
                            type="date" 
                            onChange={this.onChangeDateTo}
                            min={minTo}
                        />
                    </Col>
                    <Col>
                        <InputWithLabel 
                            controlId="name" 
                            labelText="Name" 
                            type="text" 
                            onChange={this.onChangeName}
                            min={''}
                        />
                    </Col>
                </Row>
                <Button variant="primary" type='submit'>Ok</Button>
            </Form>
        );
    }
}