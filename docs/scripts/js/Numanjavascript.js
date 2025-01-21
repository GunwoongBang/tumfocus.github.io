//------------------------------------------------------------------------------------------------//
// Home.html
// Calling the bottom navigation to the page
document.addEventListener("DOMContentLoaded", () => {
    const navPlaceholder = document.getElementById("bottom-navigation");
    if (navPlaceholder) {
        fetch("../bottom-navigation.html")
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Failed to load bottom-navigation:", err));
    }
});

//------------------------------------------------------------------------------------------------//
// Profile.html
document.addEventListener("DOMContentLoaded", () => {
const navPlaceholder = document.getElementById("bottom-navigation");
if (navPlaceholder) {
    fetch("../bottom-navigation.html")
        .then(response => response.text())
        .then(data => {
            navPlaceholder.innerHTML = data;
        })
        .catch(err => console.error("Failed to load bottom-navigation:", err));
    }
});

//------------------------------------------------------------------------------------------------//
// Signin.html
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = 'Images/eye-on.svg';
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = 'Images/eye-off.svg';
    }
}

document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Please fill in both username and password.");
    } else {
      window.location.href = "docs/Home.html";
    }
  });
