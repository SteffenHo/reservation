import React, {useEffect, useState} from "react";
import './form.css';
import { MultiSelectDependencies } from "./MultiSelectDependencies";
import { ProductSearchBar } from "./ProductSearchBar";

export const AddDependenciesForm = () => {
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [options, setOptions] = useState([]);
    const [allDependenciesOptions, setAllDependenciesOptions] = useState([]);
    const [allDependenciesValue, setAllDependenciesValue] = useState([]);
    const [dependenciesOptions, setDependenciesOptions] = useState([]);
    const [dependenciesValue, setDependenciesValue] = useState([]);
    const [noDependenciesOptions, setNoDependenciesOptions] = useState([]);
    const [noDependenciesValue, setNoDependenciesValue] = useState([]);
    const [multiDependenciesOptions, setMultiDependenciesOptions] = useState([]);
    const [multiDependenciesValue, setMultiDependenciesValue] = useState([]);

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
            let contentDependencies = [];
            let contentNoDependencies = [];
            let contentMultiDependencies = [];
            if (rawResponse.status === 200) {
                const rawContent = await rawResponse.json();
                contentDependencies = rawContent.dependencies;
                contentNoDependencies = rawContent.noDependencies;
                contentMultiDependencies = rawContent.multiDependencies;
            }
            console.log(contentDependencies);

            const products = options.filter(product => product.value !== selectedProduct);
            let defaultDependencies = [];
            for (let i = 0; i < contentDependencies.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (contentDependencies[i] === products[j].value) {
                        defaultDependencies.push(products[j]);
                    }
                }
            }
            let defaultNoDependencies = [];
            for (let i = 0; i < contentNoDependencies.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (contentNoDependencies[i] === products[j].value) {
                        defaultNoDependencies.push(products[j]);
                    }
                }
            }
            let defaultMultiDependencies = [];
            for (let i = 0; i < contentMultiDependencies.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (contentMultiDependencies[i] === products[j].value) {
                        defaultMultiDependencies.push(products[j]);
                    }
                }
            }
            console.log(defaultDependencies);
            setAllDependenciesOptions(products);
            setDependenciesValue(defaultDependencies);
            setNoDependenciesValue(defaultNoDependencies);
            setMultiDependenciesValue(defaultMultiDependencies);
        }
        fetchData();
    }, [selectedProduct]);

    useEffect(() => {
        setAllDependenciesValue(dependenciesValue.concat(noDependenciesValue).concat(multiDependenciesValue));
    }, [dependenciesValue, noDependenciesValue, multiDependenciesValue]);

    useEffect(() => {
        let allDependencies = allDependenciesOptions;
        for (let i = 0; i < allDependenciesValue.length; i++) {
            allDependencies = allDependencies.filter(item => item.value !== allDependenciesValue[i].value);
        }
        setDependenciesOptions(allDependencies);
        setNoDependenciesOptions(allDependencies);
        setMultiDependenciesOptions(allDependencies);
    }, [allDependenciesValue])

    useEffect(() => {
        const fetchData = async () => {
            const route = "http://localhost:3000/product/" + selectedProduct + "/dependencies";
            const rawResponse = await fetch(route, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dependencies: dependenciesValue.map(item => item.value),
                    noDependencies: noDependenciesValue.map(item => item.value),
                    multiDependencies: multiDependenciesValue.map(item => item.value)
                })
            });
            const content = await rawResponse.json();
            console.log(content);
        }
        fetchData();
    }, [allDependenciesValue]);

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
                labelText={"Schnittstelle-/Abhängigkeiten"}
                onChange={event => setDependenciesValue(event)}
                options={dependenciesOptions}
                value={dependenciesValue}
            />
            <MultiSelectDependencies
                controlId={"addNoDependencyMultiSelect"}
                labelText={"keine Schnittstelle-/Abhängigkeiten"}
                onChange={event => setNoDependenciesValue(event)}
                options={noDependenciesOptions}
                value={noDependenciesValue}
            />
            <MultiSelectDependencies
                controlId={"addMultiDependencyMultiSelect"}
                labelText={"mehrstufige Abhängigkeiten"}
                onChange={event => setMultiDependenciesValue(event)}
                options={multiDependenciesOptions}
                value={multiDependenciesValue}
            />
        </div>
    );
}