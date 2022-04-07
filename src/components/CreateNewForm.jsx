import React from "react";
import { InputWithLabel } from "./InputWithLabel";
import './form.css'
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { SelectWithLabel } from "./SelectWithLabel";

export class CreateNewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: 0,
            description: "",
            department: "",
            serviceLevel: 0,
            externalPatners: "",
            otherDepartments: "",
            showModal: false,
            modalTitle: "",
            modalText: ""
        }
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeExternalPatners = this.onChangeExternalPatners.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeOtherDepartments = this.onChangeOtherDepartments.bind(this);
        this.onChangeServiceLevel = this.onChangeServiceLevel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeCategory(event) {
        this.setState({
            category: event.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeDepartment(event) {
        this.setState({
            department: event.target.value
        });
    }

    onChangeServiceLevel(event) {
        this.setState({
            serviceLevel: event.value
        });
    }

    onChangeExternalPatners(event) {
        this.setState({
            externalPatners: event.target.value
        });
    }

    onChangeOtherDepartments(event) {
        this.setState({
            otherDepartments: event.target.value
        });
    }

    async onSubmit(event) {
        event.preventDefault();
        const body = {
            name: this.state.name,
            category: this.state.category,
            description: this.state.description,
            department: this.state.department,
            serviceLevel: this.state.serviceLevel,
            externalPatners: this.state.externalPatners,
            otherDepartments: this.state.otherDepartments
        }

        if (body.category === 0) {
            this.setState({
                showModal: true,
                modalTitle: "Fehlende Angabe",
                modalText: "Bitte geben sie die Kategorie an!"
            });
            return;
        }

        if (body.serviceLevel === 0) {
            this.setState({
                showModal: true,
                modalTitle: "Fehlende Angabe",
                modalText: "Bitte geben sie das Servicelevel an!"
            });
            return;
        }

        const rawResponse = await fetch('http://localhost:3000/product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        console.log(content);

        this.setState({
            name: "",
            category: 0,
            description: "",
            department: "",
            serviceLevel: 0,
            externalPatners: "",
            otherDepartments: "",
            showModal: true,
            modalTitle: "Anlegen erfolgreich",
            modalText: "Das Produkt " + body.name + " wurde erfolgreich angelegt."
        });
    }

    render() {
        const optionsCategory = [
            { value: 0, label: "Bitte auswählen" },
            { value: 1, label: "Produkt" },
            { value: 2, label: "Service" }
        ];

        const optionsServiceLevel = [
            { value: 0, label: "Bitte auswählen" },
            { value: 1, label: "1 - Koord. & Weiter- & Eigenentwicklung" },
            { value: 2, label: "2 - Koord. & Weiterentwicklung" },
            { value: 3, label: "3 - nur Koordination" },
            { value: 4, label: "4 - offen" },
            { value: 5, label: "5 - keine Interaktion" },
            { value: 6, label: "n/a" },
            { value: 7, label: "zu klären" }
        ];

        return (
            <div className="form-head mt-3">
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.state.modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.modalText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({showModal: false})}>
                        Ok
                    </Button>
                </Modal.Footer>
                </Modal>
                <h4>
                    Neues Produkt / Neuer Service
                </h4>
                <p>
                    Zum eintragen eines Produktes oder Services bitte ausfüllen und auf OK drücken.
                </p>
                <Row className="justify-content-md-center mx-2">
                    <Col md={7}>
                        <Form className="form" onSubmit={this.onSubmit}>
                            <InputWithLabel
                                controlId={"createNewName"}
                                labelText={"Name"}
                                isRequired={true}
                                onChange={this.onChangeName}
                                value={this.state.name}
                            />
                            <SelectWithLabel
                                controlId={"createNewCategory"}
                                labelText={"Kategorie"}
                                options={optionsCategory}
                                onChange={this.onChangeCategory}
                                value={this.state.category}
                            />
                            <InputWithLabel
                                controlId={"createNewDescription"}
                                labelText={"Beschreibung"}
                                isRequired={true}
                                onChange={this.onChangeDescription}
                                value={this.state.description}
                            />
                            <InputWithLabel
                                controlId={"createNewDepartment"}
                                labelText={"Zuständiger Fachbereich"}
                                isRequired={true}
                                onChange={this.onChangeDepartment}
                                value={this.state.department}
                            />
                            <SelectWithLabel
                                controlId={"createNewServiceLevel"}
                                labelText={"Servicelevel"}
                                options={optionsServiceLevel}
                                onChange={this.onChangeServiceLevel}
                                value={this.state.serviceLevel}
                            />
                            <InputWithLabel
                                controlId={"createNewExternalPatners"}
                                labelText={"Externe Partner"}
                                isRequired={false}
                                onChange={this.onChangeExternalPatners}
                                value={this.state.externalPatners}
                            />
                            <InputWithLabel
                                controlId={"createNewOtherDepartments"}
                                labelText={"Involvierte Fachbereiche"}
                                isRequired={false}
                                onChange={this.onChangeOtherDepartments}
                                value={this.state.otherDepartments}
                            />
                            <Button variant={"primary"} type={"submit"} className="button mt-3">
                                Produkt / Service anlegen
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </div>
        )
    }
}