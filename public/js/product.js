// products.js

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

function loadProducts() {
    fetch("/api/products")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("productTable");
            table.innerHTML = "";

            data.forEach(product => {
                let row = `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>₹${product.price}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
                `;
                table.innerHTML += row;
            });
        });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    if (!name || !price || !stock) {
        alert("Fill all fields");
        return;
    }

    fetch("/api/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, category, price, stock })
    })
    .then(res => res.json())
    .then(() => {
        alert("Product Added");
        loadProducts();
    });
}

function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    fetch(`/api/products/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadProducts();
    });
}