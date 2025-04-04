const namn = document.getElementById("exampleFormControlInput1");
const email = document.getElementById("exampleFormControlInput2");
const phone = document.getElementById("exampleFormControlInput3");
const street = document.getElementById("exampleFormControlInput4");
const postcode = document.getElementById("exampleFormControlInput5");
const city = document.getElementById("exampleFormControlInput6");
const form = document.getElementById("delivery-form");
const errorElement = document.getElementById("errorElement");

form.addEventListener("submit", (e) => {
  let msg = [];

  if (validate(namn)) {
    msg.push("Please enter your name");
    namn.style.border = "red 1px solid";
  } else {
    namn.style.border = "black 1px solid";
  }
  namn.addEventListener("input", function () {
    if (validate(namn)) {
      namn.style.border = "red 1px solid";
    } else {
      namn.style.border = "green 1px solid";
    }
  });

  if (validateEmail(email)) {
    msg.push("Please enter your email");
    email.style.border = "red 1px solid";
  } else {
    email.style.border = "black 1px solid";
  }
  email.addEventListener("input", function () {
    if (validateEmail(email)) {
      email.style.border = "red 1px solid";
    } else {
      email.style.border = "green 1px solid";
    }
  });

  if (validatePhone(phone)) {
    msg.push("Please enter your number");
    phone.style.border = "red 1px solid";
  } else {
    phone.style.border = "black 1px solid";
  }
  phone.addEventListener("input", function () {
    if (validatePhone(phone)) {
      phone.style.border = "red 1px solid";
    } else {
      phone.style.border = "green 1px solid";
    }
  });

  if (validate(street)) {
    msg.push("Please enter street");
    street.style.border = "red 1px solid";
  } else {
    street.style.border = "black 1px solid";
  }
  street.addEventListener("input", function () {
    if (validate(street)) {
      street.style.border = "red 1px solid";
    } else {
      street.style.border = "green 1px solid";
    }
  });

  if (validateCode(postcode)) {
    msg.push("Please enter zip code");
    postcode.style.border = "red 1px solid";
  } else {
    postcode.style.border = "black 1px solid";
  }
  postcode.addEventListener("input", function () {
    if (validateCode(postcode)) {
      postcode.style.border = "red 1px solid";
    } else {
      postcode.style.border = "green 1px solid";
    }
  });

  if (validate(city)) {
    msg.push("Please enter city");
    city.style.border = "red 1px solid";
  } else {
    city.style.border = "black 1px solid";
  }
  city.addEventListener("input", function () {
    if (validate(city)) {
      city.style.border = "red 1px solid";
    } else {
      city.style.border = "green 1px solid";
    }
  });

  if (msg.length > 0) {
    e.preventDefault();
    errorElement.innerText = msg.join("\n");
    errorElement.style.border = "2px solid #174e23";
    errorElement.style.borderRadius = "12px";
    errorElement.style.boxShadow = "4px 4px 0px #174e23";
    errorElement.style.transition = "transform 0.2s ease-in-out;";
  } else {
    localStorage.removeItem("cart");

    const badge = document.querySelector(".badge");
    if (badge) {
      badge.textContent = "0";
    }
  }
});

function validate(input) {
  return input.value.length < 2 || input.value.length > 50;
}

function validatePhone(phone) {
  return (
    phone.value.trim() === "" ||
    isNaN(phone.value.replace("-", "").replace("(", "").replace(")", "")) ||
    phone.value.length > 50
  );
}

function validateEmail(email) {
  return !email.value.includes("@") || validate(email);
}

function validateCode(postcode) {
  return isNaN(postcode.value) || postcode.value.length !== 5;
}
