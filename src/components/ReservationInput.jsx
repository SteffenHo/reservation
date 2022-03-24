import React, { useState } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import './ReservationInput.css'

export class ReservationInput extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    render() {
        let canMakeReservation = this.props.selectedPcState == "free";
        let canCancel = this.props.selectedPcState == "youReservert";
        return (
            <Form className='form'>
                <Row>
                    <Form.Group controlId='selectPc' as={Col}>
                        <Form.Label>
                            Wähle denn gewünschten Arbeitsplatz aus
                        </Form.Label>
                        <Form.Select className='dropdown' onChange={this.props.onChangePc} value={this.props.value}>
                            <option value={1}>Arbeitsplatz 1</option>
                            <option value={2}>Arbeitsplatz 2</option>
                            <option value={3}>Arbeitsplatz 3</option>
                            <option value={4}>Arbeitsplatz 4</option>
                            <option value={5}>Arbeitsplatz 5</option>
                            <option value={6}>Arbeitsplatz 6</option>
                            <option value={7}>Arbeitsplatz 7</option>
                            <option value={8}>Arbeitsplatz 8</option>
                            <option value={9}>Arbeitsplatz 9</option>
                            <option value={10}>Arbeitsplatz 10</option>
                            <option value={11}>Arbeitsplatz 11</option>
                            <option value={12}>Arbeitsplatz 12</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Col className='button'>
                    {canMakeReservation
                    ? <Button variant='info' onClick={this.props.new}>Reservieren</Button>
                    : <Button variant='info' disabled>Reservieren</Button>}
                    </Col>
                    <Col className='button'>
                    {canCancel
                    ? <Button variant='info' onClick={this.props.cancle}>Stornieren</Button>
                    : <Button variant='info'disabled>Stornieren</Button>}
                    </Col>
                </Row>
            </Form>
        )
    }
}
