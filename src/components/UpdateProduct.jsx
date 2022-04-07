import React, { useState, useEffect } from "react";
import { ProductSearchBar } from "./ProductSearchBar";
import { InputWithLabel } from "./InputWithLabel";
import { SelectWithLabel } from "./SelectWithLabel";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import './form.css';


const optionsCategory = [
    { value: 0, label: "Produkt / Service auswählen" },
    { value: 1, label: "Produkt" },
    { value: 2, label: "Service" }
];

const optionsServiceLevel = [
    { value: 0, label: "Produkt / Service auswählen" },
    { value: 1, label: "1 - Koord. & Weiter- & Eigenentwicklung" },
    { value: 2, label: "2 - Koord. & Weiterentwicklung" },
    { value: 3, label: "3 - nur Koordination" },
    { value: 4, label: "4 - offen" },
    { value: 5, label: "5 - keine Interaktion" },
    { value: 6, label: "n/a" },
    { value: 7, label: "zu klären" }
];

export const UpdateProduct = () => {
    const [searchOptions, setSearchOptions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(0);
    const [description, setDescription] = useState("");
    const [department, setDepartment] = useState("");
    const [serviceLevel, setServiceLevel] = useState(0);
    const [externalPatners, setExternalPatners] = useState("");
    const [otherDepartments, setOtherDepartments] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const rawResponse = await fetch("http://localhost:3000/product");
            const content = await rawResponse.json();
            console.log(content);
            const products = content.map(json => ({
                value: json.id,
                label: json.name
            }));
            setSearchOptions(products);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const route = "http://localhost:3000/product/" + selectedProduct;
            const rawResponse = await fetch(route);
            const content = await rawResponse.json();
            setName(content.name);
            setCategory(content.category);
            setDescription(content.description);
            setDepartment(content.department);
            setServiceLevel(content.serviceLevel);
            setExternalPatners(content.externalPatners);
            setOtherDepartments(content.otherDepartments);
        }
        fetchData();
    }, [selectedProduct]);

    const fetchProductUpdate = (event) => {
        event.preventDefault();
        (async () => {
            const body = {
                id: selectedProduct,
                name: name,
                category: category,
                description: description,
                department: department,
                serviceLevel: serviceLevel,
                externalPatners: externalPatners,
                otherDepartments: otherDepartments
            }
            const rawResponse = await fetch("http://localhost:3000/product", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            console.log(content);
            setShowModal(true);
        })();
    }

    return (
        <div className="form-header mt-3">
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Änderung erfolgreich
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Die Änderungen am Produkt / Service {name} wurden Erfolgreich abgespeichert.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className="justify-content-md-center mx-2">
                <Col md={7}>
                    <h4>
                        Produkt / Service änderen
                    </h4>
                    <p>
                        Zum änderen eines Produktes / Services, das Produkt suchen, die Daten änderen und bestätigen.
                    </p>
                    <ProductSearchBar
                        controlId={"updateSearch"}
                        labelText={"Produkt / Service"}
                        onChange={event => setSelectedProduct(event.value)}
                        options={searchOptions}
                    />
                    {name
                        ? (
                            <Form className="form" onSubmit={event => fetchProductUpdate(event)}>
                                <InputWithLabel
                                    controlId={"updateName"}
                                    labelText={"Name"}
                                    isRequired={true}
                                    onChange={event => setName(event.target.value)}
                                    value={name}
                                />
                                <SelectWithLabel
                                    controlId={"updateCategory"}
                                    labelText={"Kategorie"}
                                    options={optionsCategory}
                                    onChange={event => setCategory(event.value)}
                                    value={category}
                                />
                                <InputWithLabel
                                    controlId={"updateDescription"}
                                    labelText={"Beschreibung"}
                                    isRequired={true}
                                    onChange={event => setDescription(event.target.value)}
                                    value={description}
                                />
                                <InputWithLabel
                                    controlId={"updateDepartment"}
                                    labelText={"Zuständiger Fachbereich"}
                                    isRequired={true}
                                    onChange={event => setDepartment(event.target.value)}
                                    value={department}
                                />
                                <SelectWithLabel
                                    controlId={"updateServiceLevel"}
                                    labelText={"Servicelevel"}
                                    options={optionsServiceLevel}
                                    onChange={event => setServiceLevel(event.value)}
                                    value={serviceLevel}
                                />
                                <InputWithLabel
                                    controlId={"updateExternalPatners"}
                                    labelText={"Externe Partner"}
                                    isRequired={false}
                                    onChange={event => setExternalPatners(event.target.value)}
                                    value={externalPatners}
                                />
                                <InputWithLabel
                                    controlId={"updateOtherDepartments"}
                                    labelText={"Involvierte Fachbereiche"}
                                    isRequired={false}
                                    onChange={event => setOtherDepartments(event.target.value)}
                                    value={otherDepartments}
                                />
                                <Button variant={"primary"} type={"submit"} className="button mt-3">
                                    Änderungen speichern
                                </Button>
                            </Form>
                        )
                        : false}

                </Col>
            </Row>
        </div>
    )
}