import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";
import './form.css'

const productService = {
    1: "Produkt",
    2: "Service",
    3: "zu klären"
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

function getDependencyList(dependencies) {
    return dependencies.map((item, index) => {
        return (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start" eventKey={item.id}>
                <div>
                    <h6>
                        <strong>{item.name}</strong>
                    </h6>
                    {item.description}
                </div>
                <Badge bg="primary" pill>
                    {serviceLevel[item.serviceLevel]}
                </Badge>
            </ListGroup.Item>
        );
    });
}

export const ProductView = ({
    product,
    dependencies,
    noDependencies,
    multiDependencies,
    onClick
}) => {
    const dependencyList = dependencies ? getDependencyList(dependencies) : [];
    const noDependencyList = noDependencies ? getDependencyList(noDependencies) : [];
    const multiDependencyList = multiDependencies ? getDependencyList(multiDependencies) : [];
    console.log(dependencyList, dependencies);
    if ("name" in product) {
        let productCategory = product.category;
        let productServiceLevel = product.serviceLevel;
        let productPartners = product.externalPatners;
        let productDepartments = product.otherDepartments;
        console.log(productCategory, productServiceLevel, productPartners);
        const productcategory = productService[productCategory];
        const productserviceLevel = serviceLevel[productServiceLevel];
        const productextrenalPatners = productPartners ? productPartners : "keine";
        const productotherDepartments = productDepartments ? productDepartments : "keine";
        console.log(productPartners, product);
        return (
            <Card className="left-text">
                <Card.Header as="h6">
                    {product.name}
                </Card.Header>
                <Card.Text>
                    <p>
                        Kategory: {productcategory} <br />
                        Abteilung: {product.department} <br />
                        SLA: {productserviceLevel}
                    </p>
                    <p>
                        {product.description}
                    </p>
                    <p>
                        Externe Patner: {productextrenalPatners}, <br />
                        Involvierte Fachbereiche: {productotherDepartments}
                    </p>
                    <p>
                        Schnittstelle-/Abhängigkeiten
                    </p>
                </Card.Text>
                <ListGroup onClick={onClick}>
                    {dependencyList}
                </ListGroup>
                <Card.Text>
                    keine Schnittstelle-/Abhängigkeiten
                </Card.Text>
                <ListGroup onClick={onClick}>
                    {noDependencyList}
                </ListGroup>
                <Card.Text>
                    mehrstufige Abhängigkeiten
                </Card.Text>
                <ListGroup onClick={onClick}>
                    {multiDependencyList}
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