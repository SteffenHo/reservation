import React, { useState } from 'react';
import {Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import './WorkingPlace.css'

export const WorkingPlace = (props) => {
    return (
        <Card>
            <Card.Header>
                Arbeitsplatz {props.pcNumber}
            </Card.Header>
            <Card.Body>
                {/*Hier wird eine PC Grafik sein.*/}
                <div className='monitor'/>
                <div className='keyboard'/>
            </Card.Body>
            <ListGroup>
                <ListGroupItem className={props.pcState.className}>{props.pcState.text}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Button variant='primary' value={props.pcNumber} onClick={props.onChangePc}>Auswählen</Button>
            </Card.Body>
        </Card>
    )
}