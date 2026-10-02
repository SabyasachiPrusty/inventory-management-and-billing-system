// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});

function loadDashboard() {

    // Products count
    fetch("/api/products")
        .then(res => res.json())
        .then(data => {
            document.getElementById("productCount").innerText = data.length;
        });

    // Sales count
    fetch("/api/sales")
        .then(res => res.json())
        .then(data => {
            document.getElementById("salesCount").innerText = data.length;
        });
}