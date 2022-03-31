import React from "react";
import { InputWithLabel } from "./InputWithLabel";
import './form.css'
import { Form, Button } from "react-bootstrap";
import { SelectWithLabel } from "./SelectWithLabel";

export class CreateNewForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-head">
                <h4>
                    Neues Produkt / Neuer Service
                </h4>
                <p>
                    Zum eintragen eines Produktes oder Services bitte ausfüllen und auf OK drücken.
                </p>
                <Form className="form">
                    <InputWithLabel controlId={"createNewName"} labelText={"Name"} />
                    <SelectWithLabel controlId={"createNewCategory"} labelText={"Kategorie"} />
                    <InputWithLabel controlId={"createNewDescription"} labelText={"Beschreibung"} />
                    <InputWithLabel controlId={"createNewDepartment"} labelText={"Zuständiger Fachbereich"} />
                    <SelectWithLabel controlId={"createNewServiceLevel"} labelText={"Servicelevel"} />
                    <InputWithLabel controlId={"createNewExternalPatners"} labelText={"Externe Partner"} />
                    <InputWithLabel controlId={"createNewOtherDepartments"} labelText={"Involvierte Fachbereiche"} />
                    <Button variant={"primary"} type={"submit"} className="button">
                        Ok
                    </Button>
                </Form>
            </div>
        )
    }
}