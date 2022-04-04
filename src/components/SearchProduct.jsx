import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { ProductSearchBar } from "./ProductSearchBar";
import { ProductView } from "./ProductView";

const testProduct = {
    name: "Name",
    category: "Kategorie",
    department: "Fachbereich",
    serviceLevel: "Servicelevel",
    description: "Beschreibung",
    extranalPatners: "keine",
    otherDepartments: "keine"
}

const testDependencies = [
    {
        name: "Hello World",
        department: "Test",
        serviceLevel: "1"
    },
    {
        name: "Hello World",
        department: "Test2",
        serviceLevel: "1"
    },
    {
        name: "Hello World",
        department: "Test3",
        serviceLevel: "1"
    },
    {
        name: "Hello World",
        department: "Test4",
        serviceLevel: "1"
    }
];

let listElements = testDependencies.map((item, index) => {
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
    )
});

export const SearchProduct = () => {
    return (
        <div>
            <h4>
                Produkt / Service suchen
            </h4>
            <p>
                Zum suchen eines Produktes oder Services den Namen eingeben.
            </p>
            <ProductSearchBar
                controlId={"searchProductSearchBar"}
                labelText={"Produkt / Service"}
                onChange={event => {}}
            />
            <ProductView
                product={testProduct}
                depenencies={listElements}
            />
        </div>
    )
}