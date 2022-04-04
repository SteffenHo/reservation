import React, {useEffect, useState} from "react";
import './form.css';
import { MultiSelectDependencies } from "./MultiSelectDependencies";
import { ProductSearchBar } from "./ProductSearchBar";

export const AddDependenciesForm = () => {
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [options, setOptions] = useState([]);
    const [dependenciesOptions, setDependenciesOptions] = useState([]);
    const [dependenciesValue, setDependenciesValue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const rawResponse = await fetch("http://localhost:3000/product");
            const content = await rawResponse.json();
            console.log(content);
            const products = content.map(json => ({
                value: json.id,
                label: json.name
            }));
            setOptions(products);
        }
        fetchData()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const route = "http://localhost:3000/product/" + selectedProduct + "/dependencies";
            const rawResponse = await fetch(route);
            let content = [];
            if (rawResponse.status === 200) {
                const rawContent = await rawResponse.json();
                content = rawContent.dependencies;
            }
            console.log(content);

            const products = options.filter(product => product.value !== selectedProduct);
            let defaults = [];
            for (let i = 0; i < content.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (content[i] === products[j].value) {
                        defaults.push(products[j]);
                    }
                }
            }
            console.log(defaults);
            setDependenciesOptions(products);
            setDependenciesValue(defaults);
        }
        fetchData();
    }, [selectedProduct]);

    return (
        <div className="form-header">
            <h4>
                Abhängigkeiten hinzufügen / ändern
            </h4>
            <p>
            Zum hinzufügen und ändern von Abhängigkeiten in dem oberen Suchfeld das Produkt / den Service auswählen und 
            im unteren Suchfeld die Abhängigkeiten eingeben.
            </p>
            <ProductSearchBar 
                controlId={"addDependencySearch"} 
                labelText={"Produkt / Service"} 
                onChange={event => {setSelectedProduct(event.value)}}
                options={options} 
            />
            <MultiSelectDependencies
                controlId={"addDependencyMultiSelect"}
                labelText={"Abhängigkeiten"}
                onChange={event => {
                    setDependenciesValue(event);
                    (async () => {
                        const route = "http://localhost:3000/product/" + selectedProduct + "/dependencies";
                        const rawResponse = await fetch(route, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                dependencies: event.map(item => item.value)
                            })
                        });
                        const content = await rawResponse.json();
                      
                        console.log(content);
                    })();
                }}
                options={dependenciesOptions}
                value={dependenciesValue}
            />
        </div>
    );
}