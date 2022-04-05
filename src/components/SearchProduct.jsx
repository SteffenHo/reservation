import React, {useEffect, useState} from "react";
import { ProductSearchBar } from "./ProductSearchBar";
import { ProductView } from "./ProductView";

export const SearchProduct = () => {
    const [searchOptions, setSearchOptions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [product, setProduct] = useState({});
    const [dependencies, setDependencies] = useState([]);

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
            let content = {};
            if (rawResponse.status === 200) {
                content = await rawResponse.json();
            }
            setProduct(content);
        }
        fetchData();
    }, [selectedProduct]);

    useEffect(() => {
        const fetchData = async () => {
            let route = "http://localhost:3000/product/" + selectedProduct + "/dependencies";
            let rawResponse = await fetch(route);
            if (rawResponse.status !== 200) {
                setDependencies([]);
                return;
            }
            let content = await rawResponse.json();
            const dependencyIds = content.dependencies;
            let dependencies = []
            for (let i = 0; i < dependencyIds.length; i++) {
                route = "http://localhost:3000/product/" + dependencyIds[i];
                rawResponse = await fetch(route);
                if (rawResponse.status === 200) {
                    content = await rawResponse.json();
                    dependencies.push(content);
                }
            }
            setDependencies(dependencies);
        }
        fetchData();
    }, [selectedProduct]);

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
                onChange={event => {setSelectedProduct(event.value)}}
                options={searchOptions}
            />
            <ProductView
                product={product}
                depenencies={dependencies}
                onClick={event => setSelectedProduct(parseInt(event.target.attributes[0].value))}
            />
        </div>
    );
}