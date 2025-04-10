const handleRegister = async () => {
    const userName = document.getElementById("userName").value.trim();
    const userImage = document.getElementById("userImage").value.trim();
    const userPassword = document.getElementById("userPassword").value;

    if (!userName || !userImage || !userPassword) {
        alert("Please fill out all fields.");
        return;
    }

    const newUser = {
        userName,
        userImage,
        userPassword,
    };

    try {
        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            alert("Registration successful!");
            window.location.href = "../index.html"; // Redirect to home page or wherever you like
        } else {
            alert(data.message || "Registration failed. Try again.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again later.");
    }
};
if (data.success) {
    localStorage.setItem("loggedInUser", JSON.stringify(data.user)); // ✅ Save user
    alert("Registration successful!");
    window.location.href = "./home.html"; // ✅ Auto-redirect to home
}

const handleLogin = () => {
    window.location.href = "../register.html"
}