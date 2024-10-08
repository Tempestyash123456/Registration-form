document.getElementById("my-form").addEventListener("input", function (event) {
  const target = event.target;
  const id = target.id;
  const value = target.value.trim();
  const errorElement = document.getElementById(`${id}-error`);
  errorElement.textContent = "";

  let isValid = true;

  if (id === "firstname" && !/^[a-zA-Z]*$/.test(value)) {
    errorElement.textContent =
      "First name must contain only alphabetic characters.";
    isValid = false;
  }

  if (id === "lastname" && !/^[a-zA-Z]*$/.test(value)) {
    errorElement.textContent =
      "Last name must contain only alphabetic characters.";
    isValid = false;
  }

  if (id === "email") {
    const emailPattern = /^[a-zA-Z0-9._-]*@[a-zA-Z.-]*\.[a-zA-Z]{0,6}$/;
    if (!emailPattern.test(value)) {
      errorElement.textContent = "Please enter a valid email address.";
      isValid = false;
    }
  }

  if (id === "mobile-number") {
    const mobilePattern = /^[6-9][0-9]{0,9}$/;
    if (!mobilePattern.test(value)) {
      errorElement.textContent =
        "Mobile number must start with digits 6-9 and be up to 10 digits long.";
      isValid = false;
    }
  }

  if (!isValid) {
    target.classList.add("invalid");
  } else {
    target.classList.remove("invalid");
  }
});

document.getElementById("my-form").addEventListener("submit", function (event) {
  let isValid = checkFormValidity(); // Use the updated function to check validity

  if (!isValid) {
    event.preventDefault();
  } else {
    event.preventDefault();
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile-number").value.trim();
    const dob = document.getElementById("dob").value.trim();

    // Create query string
    const queryString = `?firstname=${encodeURIComponent(
      firstname
    )}&lastname=${encodeURIComponent(lastname)}&email=${encodeURIComponent(
      email
    )}&mobile=${encodeURIComponent(mobile)}&dob=${encodeURIComponent(dob)}`;

    // Redirect to welcome.html with the query string
    window.location.href = "welcome.html" + queryString;
  }
});

document.getElementById("password").addEventListener("input", function (event) {
  const value = event.target.value.trim();
  const rules = [
    { id: "length", pattern: /.{8,}/ },
    { id: "uppercase", pattern: /[A-Z]/ },
    { id: "lowercase", pattern: /[a-z]/ },
    { id: "number", pattern: /[0-9]/ },
    { id: "special", pattern: /[_@.-]/ },
    { id: "start-letter", pattern: /^[a-zA-Z]/ },
  ];

  let passwordIsValid = true;

  rules.forEach(function (rule) {
    const element = document.getElementById(rule.id);
    const isValid = rule.pattern.test(value);
    element.classList.toggle("valid", isValid);
    element.classList.toggle("invalid", !isValid);

    if (!isValid) {
      passwordIsValid = false;
    }
  });

  document.getElementById("password-dialog").style.display = "block";

  // Re-check form validity when the password input changes
  checkFormValidity();

  return passwordIsValid;
});

document
  .getElementById("password-revealer")
  .addEventListener("click", function () {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  });

document
  .getElementById("firstname")
  .addEventListener("input", function (event) {
    handleNameInput(event, "firstname");
  });

document.getElementById("lastname").addEventListener("input", function (event) {
  handleNameInput(event, "lastname");
});

function handleNameInput(event, id) {
  const inputElement = document.getElementById(id);
  const errorElement = document.getElementById(`${id}-error`);
  const value = inputElement.value;

  if (/[^a-zA-Z]/.test(value)) {
    errorElement.textContent = "Names must contain only alphabetic characters.";
    inputElement.value = value.replace(/[^a-zA-Z]/g, "");
  } else {
    errorElement.textContent = "";
  }
}

document
  .getElementById("mobile-number")
  .addEventListener("input", function (event) {
    handlePhoneNumberInput(event);
  });

function handlePhoneNumberInput(event) {
  const inputElement = document.getElementById("mobile-number");
  const errorElement = document.getElementById("mobile-error");
  let value = inputElement.value;

  value = value.replace(/\D/g, "");

  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  if (/^[0-5]/.test(value)) {
    errorElement.textContent = "Mobile number must start with digits 6-9.";
    value = value.slice(1);
  } else {
    errorElement.textContent = "";
  }

  inputElement.value = value;
}

// --- Updated checkFormValidity function ---
// Check form validity and toggle submit button state
function checkFormValidity() {
  let isValid = true;

  // Define all the fields that need to be validated
  const fields = [
    { id: "firstname", minLength: 4 },
    { id: "lastname", minLength: 6 },
    { id: "email", pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,6}$/ },
    { id: "mobile-number", pattern: /^[6-9][0-9]{9}$/ },
    { id: "dob", required: true },
  ];

  // Validate each field
  fields.forEach(function (field) {
    const inputElement = document.getElementById(field.id);
    const value = inputElement.value.trim();

    if (field.required && !value) {
      isValid = false;
    }

    if (field.minLength && value.length < field.minLength) {
      isValid = false;
    }

    if (field.pattern && !field.pattern.test(value)) {
      isValid = false;
    }
  });

  // Validate password separately
  const password = document.getElementById("password").value.trim();
  const passwordRules = [
    /.{8,}/, // At least 8 characters
    /[A-Z]/, // Contains uppercase
    /[a-z]/, // Contains lowercase
    /[0-9]/, // Contains a number
    /[_@.-]/, // Contains a special character
    /^[a-zA-Z]/, // Starts with a letter
  ];

  passwordRules.forEach(function (rule) {
    if (!rule.test(password)) {
      isValid = false;
    }
  });

  // Toggle submit button based on validity
  document.getElementById("submit-button").disabled = !isValid;

  return isValid;
}

// Attach event listeners to all input fields
document.querySelectorAll("#my-form input").forEach(function (inputElement) {
  inputElement.addEventListener("input", checkFormValidity);
});

// Run the check initially in case fields are pre-filled or empty
checkFormValidity();
