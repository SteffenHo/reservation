import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export const ProductView = ({
    product,
    depenencies
}) => {
    return (
        <Card>
            <Card.Header as="h6">
                {product.name}
            </Card.Header>
            <Card.Text>
                <p>
                    {product.category} | {product.department} | {product.serviceLevel}
                </p>
                <p>
                    {product.description}
                </p>
                <p>
                    Externe Patner: {product.extranalPatners}, Involvierte Fachbereiche: {product.otherDepartments}
                </p>
                <ListGroup>
                    {depenencies}
                </ListGroup>
            </Card.Text>
        </Card>
    );
}