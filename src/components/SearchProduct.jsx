import React, {useEffect, useState} from "react";
import { ProductSearchBar } from "./ProductSearchBar";
import { ProductView } from "./ProductView";

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

export const SearchProduct = () => {
    const [searchOptions, setSearchOptions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [product, setProduct] = useState({});

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
    }, [selectedProduct])

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
                depenencies={testDependencies}
            />
        </div>
    )
}