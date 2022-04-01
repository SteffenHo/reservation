export async function getAllProducts() {
    const rawResponse = await fetch("http://localhost:3000/product");
    const content = await rawResponse.json();
    console.log(content);
    const products = content.map(json => ({
        value: json.id,
        label: json.name
    }));
    console.log(products);
    return products;
}