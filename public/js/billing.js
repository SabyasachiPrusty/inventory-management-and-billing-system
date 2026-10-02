// billing.js

let cart = [];
let products = [];

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

function loadProducts() {
    fetch("/api/products")
        .then(res => res.json())
        .then(data => {
            products = data;

            const select = document.getElementById("product");
            select.innerHTML = "";

            data.forEach(p => {
                let option = document.createElement("option");
                option.value = p.id;
                option.text = `${p.name} (₹${p.price})`;
                select.appendChild(option);
            });
        });
}

function addItem() {
    const productId = document.getElementById("product").value;
    const qty = parseInt(document.getElementById("qty").value);

    if (!qty || qty <= 0) {
        alert("Enter valid quantity");
        return;
    }

    const product = products.find(p => p.id == productId);

    if (product.stock < qty) {
        alert("Insufficient stock");
        return;
    }

    const total = product.price * qty;

    cart.push({
        product_id: product.id,
        name: product.name,
        price: product.price,
        qty: qty,
        total: total
    });

    renderBill();
}

function renderBill() {
    const table = document.getElementById("billTable");
    table.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
        </tr>
    `;

    let grandTotal = 0;

    cart.forEach(item => {
        let row = `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
            <td>${item.total}</td>
        </tr>
        `;
        table.innerHTML += row;
        grandTotal += item.total;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}

function generateInvoice() {

    if (cart.length === 0) {
        alert("No items in cart");
        return;
    }

    // Save to DB
    cart.forEach(item => {
        fetch("/api/sales/bill", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });
    });

    // Store for invoice page
    localStorage.setItem("invoiceItems", JSON.stringify(cart));

    // Redirect to invoice
    window.location.href = "invoice.html";
}