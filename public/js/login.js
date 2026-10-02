// login.js

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token); 

            // Role-based redirect
            if (data.user.role === "admin") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "billing.html";
            }

        } else {
            alert("Invalid Credentials");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server Error");
    });
}