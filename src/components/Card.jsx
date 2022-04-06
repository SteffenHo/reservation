import React, { useState } from 'react';
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';

export const BootstrapCard = ({
    title,
    link
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="//images.ernstings-family.com/teaser/220304_hp_yi-collection_wave-halb/teaser_wave_half_oln_xs" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary" href={link} target='_blank'>Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}