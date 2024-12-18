/* Landing Page JavaScript */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");
  const loginDisplay = document.getElementById("login-display");
  const signupDisplay = document.getElementById("signup-display");

  const loginLinks = document.querySelectorAll(".requires-login");
  const signupLinks = document.querySelectorAll(".signup");
  const loginClose = loginDisplay.querySelector(".close");
  const signupClose = signupDisplay.querySelector(".close");


  // Open modal when any trigger is clicked
  loginLinks.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      loginDisplay.style.display = "block";
    });
  });

  // Close modal on clicking close button or outside modal
  loginClose.addEventListener("click", () => {
    loginDisplay.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === loginDisplay) {
      loginDisplay.style.display = "none";
    }
  });

  signupLinks.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      signupDisplay.style.display = "block";
      loginDisplay.style.display = "none";

    });
  });

  // Close modal on clicking close button or outside modal
  signupClose.addEventListener("click", () => {
    signupDisplay.style.display = "none";

  });

  window.addEventListener("click", (event) => {
    if (event.target === signupDisplay) {
      signupDisplay.style.display = "none";
    }
  });

  loginForm.onsubmit = async function (event) {
    event.preventDefault();

    const loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };

    const response = await fetch(`${apiBaseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    localStorage.setItem("login-data", JSON.stringify(data));
    window.location.assign("./posts.html");

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
  };

  signupForm.onsubmit = async function (event) {
    event.preventDefault();

    const username = document.getElementById("signup-username").value;
    const fullName = document.getElementById("signup-fullName").value;
    const password = document.getElementById("signup-password").value;

    const signupData = { username, fullName, password };

    const response = await fetch(`${apiBaseURL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Sign up failed: ${error.message}`);
      return;
    }

    alert("Sign up successful! Please log in.");
    window.location.assign("index.html");
  };


});
