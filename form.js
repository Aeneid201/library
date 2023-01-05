"use strict";
// DOM elements
const signupForm = document.querySelector(".signupForm");
const email = document.getElementById("email");
const errorMsg = document.querySelector(".alert");
const country = document.querySelector("input[name='country']");
const zipCode = document.querySelector("input[name='zipCode']");
const password = document.querySelector("input[name='password']");
const confirmPassword = document.querySelector("input[name='confirmPassword']");
const allInputs = document.querySelectorAll(".signupForm input");
// form submission
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateAll()) {
  } else if (!passwordMatch()) {
    alert("Passwords don't match! Please try again.");
  } else {
    alert("Your form has been submitted successfully!");
    this.reset();
  }
});

// field validation
checkValidity(email);
checkValidity(country);
checkValidity(zipCode);
checkValidity(password);
checkValidity(confirmPassword);

// function that checks input validity
function checkValidity(input) {
  input.addEventListener("input", function (e) {
    if (input.validity.valid) {
      errorMsg.textContent = "";
      errorMsg.classList.add("d-none");
    } else {
      showError(input);
    }
  });
}

// function to display the error
function showError(input) {
  if (input.validity.valueMissing) {
    errorMsg.textContent = "Please enter a valid input.";
  } else if (input.validity.typeMismatch) {
    errorMsg.textContent = "Invalid input. Please try again.";
  }

  errorMsg.classList.remove("d-none");
  return errorMsg.textContent;
}

// validate all fields
function validateAll() {
  let result = Boolean;
  allInputs.forEach((element) => {
    if (!element.validity.valid) {
      showError(element);
      result = false;
    } else {
      result = true;
    }
  });
  return result;
}

// function to check password
function passwordMatch() {
  if (confirmPassword.value.trim() === password.value.trim()) {
    return true;
  } else {
    return false;
  }
}
