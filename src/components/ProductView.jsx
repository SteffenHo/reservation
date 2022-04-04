import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

const productService = {
    1: "Produkt",
    2: "Service"
}

const serviceLevel = {
    1: "1 - Koord. & Weiter- & Eigenentwicklung",
    2: "2 - Koord. & Weiterentwicklung",
    3: "3 - nur Koordination",
    4: "4 - offen",
    5: "5 - keine Interaktion",
    6: "n/a",
    7: "zu klären"
}

export const ProductView = ({
    product,
    depenencies
}) => {
    const listElements = depenencies.map((item, index) => {
        return (
            <ListGroup.Item key={index}>
                <div>
                    <h6>
                        <strong>{item.name}</strong>
                    </h6>
                    {item.department}
                </div>
                <Badge bg="primary" pill>
                    {item.serviceLevel}
                </Badge>
            </ListGroup.Item>
        );
    });
    if ("name" in product) {
        let productCategory = product.category;
        let productServiceLevel = product.serviceLevel;
        let productPartners = product.extranalPatners;
        let productDepartments = product.otherDepartments;
        console.log(productCategory, productServiceLevel, productPartners);
        const productcategory = productService[productCategory];
        const productserviceLevel = serviceLevel[productServiceLevel];
        const productextranalPatners = productPartners ? productPartners : "keine";
        const productotherDepartments = productDepartments  ? productDepartments : "keine";
        return (
            <Card>
                <Card.Header as="h6">
                    {product.name}
                </Card.Header>
                <Card.Text>
                    <p>
                        {productcategory} | {product.department} | {productserviceLevel}
                    </p>
                    <p>
                        {product.description}
                    </p>
                    <p>
                        Externe Patner: {productextranalPatners}, Involvierte Fachbereiche: {productotherDepartments}
                    </p>
                </Card.Text>
                <ListGroup>
                    {listElements}
                </ListGroup>
            </Card>
        );
    }
    return (
        <Card>
            <Card.Title>
                Kein Produkt / Service ausgewählt
            </Card.Title>
        </Card>
    )
}