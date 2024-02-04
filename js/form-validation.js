// Selectors
const contactForm = document.querySelector('.contact form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');
const subjectInput = document.getElementById('subject-input');
const messageInput = document.getElementById('message-input');

/* Contact Form Validation */
contactForm.addEventListener('submit', (e) => {
  // Validate Name Input
  validateNameInput(nameInput);
  // Validate Email Input
  validateEmailInput(emailInput);
  // Validate Phone Input
  validatePhoneInput(phoneInput);
  // Validate Subject Input
  validateTextInput(subjectInput);
  // Validate Message Input
  validateTextInput(messageInput);

  // Check If Therer Are Any Error Fields
  validateFields(contactForm, e); 
});

// Functionality
function validateNameInput(nameInput) {
  let value = nameInput.value.trim();
  let regExp = /^[a-zA-Zا-ي\s]+$/;

  if (regExp.test(value)) {
    setSuccess(nameInput);
  } else {
    if (value === "") {
      setError(nameInput, "You must type your name!");
    } else {
      setError(nameInput, "Please type your real name!");
    }
  }
}

function validateEmailInput(emailInput) {
  let value = emailInput.value.trim();
  let regExp = /^[\w\.-]+@[a-z-A-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-z]{2,})?$/;

  if (regExp.test(value)) {
    setSuccess(emailInput);
  } else {
    if (value === "") {
      setError(emailInput, "You must type your email address!");
    } else if (!value.includes('@')) {
      setError(emailInput, `Email address must contain '@'. '${value}' is missing an '@'!`);
    } else {
      setError(emailInput, "Please type a valid email address!");
    }
  }
}

function validatePhoneInput(phoneInput) {
  let value = phoneInput.value.trim();
  let regExp = /^(\+)?[\d]{3}(?:(-|\.|\s))?[\d]{4}(?:(-|\.|\s))?[\d]{4}$/;

  if (regExp.test(value)) {
    setSuccess(phoneInput);
  } else {
    if (value === "") {
      setError(phoneInput, 'You must type your phone number!');
    } else {
      setError(phoneInput, "Please type a valid phone number!");
    }
  }
}

function validateTextInput(textInput) {
  let value = textInput.value.trim();
  let regExp = /^[\w\W]+$/;

  if (regExp.test(value)) {
    setSuccess(textInput);
  } else {
    setError(textInput, "Please Don't leave this field empty!")
  }
}

function setSuccess(input) {
  // Update Field Class
  input.parentElement.parentElement.classList.add('success');
  input.parentElement.parentElement.classList.remove('error');
  // Update Icon
  input.nextElementSibling.classList.replace('fa-xmark', 'fa-check');
  // Update Msg Content
  input.parentElement.nextElementSibling.textContent = "Input content is valid";
}

function setError(input, msg) {
  // Update Field Class
  input.parentElement.parentElement.classList.add('error');
  input.parentElement.parentElement.classList.remove('success');
  // Update Icon
  input.nextElementSibling.classList.replace('fa-check', 'fa-xmark');
  // Update Msg Content
  input.parentElement.nextElementSibling.textContent = msg;
}

function validateFields(form, e) {
  const allFields = form.querySelectorAll('.field');
  let valid = true;

  for (let i= 0; i < allFields.length; i++) {
    if (allFields[i].classList.contains('error')) {
      valid = false;
      focusOn(allFields[i].firstElementChild.firstElementChild);
      break;
    }
  }

  if (!valid) {
    e.preventDefault();
  }
}

function focusOn(input) {
  input.focus();
}
