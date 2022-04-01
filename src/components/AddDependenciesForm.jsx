import React from "react";
import './form.css';
import { MultiSelectDependencies } from "./MultiSelectDependencies";
import { ProductSearchBar } from "./ProductSearchBar";

export class AddDependenciesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: 0
        }
        this.onChangeSelectedProduct = this.onChangeSelectedProduct.bind(this);
        this.onChangeDependency = this.onChangeDependency.bind(this);
    }

    onChangeSelectedProduct(event) {
        this.setState({
            selectedProduct: event.value
        });
    }

    onChangeDependency(event) {
        console.log(event);
    }

    render() {
        return (
            <div className="form-header">
                <h4>
                    Abhängigkeiten hinzufügen / ändern
                </h4>
                <p>
                    Zum hinzufügen und ändern von Abhängigkeiten in dem oberen Suchfeld das Produkt / den Service
                    auswählen und im unteren Suchfeld die Abhängigkeiten eingeben.
                </p>
                <ProductSearchBar 
                    controlId={"addDependencySearch"} 
                    labelText={"Produkt / Service"} 
                    onChange={this.onChangeSelectedProduct} 
                />
                <MultiSelectDependencies
                    controlId={"addDependencyMultiSelect"}
                    labelText={"Abhängigkeiten"}
                    selectedProduct={this.state.selectedProduct}
                    onChange={this.onChangeDependency}
                />
            </div>
        )
    }
}