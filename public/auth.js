const AUTH_API = "/api/auth";

const formTitle = document.getElementById("formTitle");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const switchLink = document.getElementById("switchLink");

let mode = "login";  


if (localStorage.getItem("token")) {
    window.location.href = "index.html";
}

switchLink.addEventListener("click", function (e) {
    e.preventDefault();

    mode = mode === "login" ? "register" : "login";

    formTitle.textContent = mode === "login" ? "Login" : "Register";
    submitBtn.textContent = mode === "login" ? "Login" : "Register";
    switchText.textContent = mode === "login" ? "New here?" : "Already have an account?";
    switchLink.textContent = mode === "login" ? "Register" : "Login";
    errorMsg.textContent = "";
});

submitBtn.addEventListener("click", submitForm);

passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitForm();
});

async function submitForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        errorMsg.textContent = "Please fill both fields";
        return;
    }

    try {
        const res = await fetch(`${AUTH_API}/${mode}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = data.message;   
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        window.location.href = "index.html";

    } catch (err) {
        errorMsg.textContent = "Something went wrong. Try again.";
    }
}