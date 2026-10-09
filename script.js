// Select main form elements
const form = document.getElementById('registrationForm');
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Build a reference map for each input and its error container
const fieldMap = {
  fullName: {
    input: document.getElementById('fullName'),
    error: document.getElementById('fullNameError')
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError')
  },
  mobile: {
    input: document.getElementById('mobile'),
    error: document.getElementById('mobileError')
  },
  password: {
    input: document.getElementById('password'),
    error: document.getElementById('passwordError')
  },
  confirmPassword: {
    input: document.getElementById('confirmPassword'),
    error: document.getElementById('confirmPasswordError')
  },
  dob: {
    input: document.getElementById('dob'),
    error: document.getElementById('dobError')
  },
  gender: {
    input: document.getElementById('gender'),
    error: document.getElementById('genderError')
  },
  address: {
    input: document.getElementById('address'),
    error: document.getElementById('addressError')
  },
  city: {
    input: document.getElementById('city'),
    error: document.getElementById('cityError')
  },
  state: {
    input: document.getElementById('state'),
    error: document.getElementById('stateError')
  },
  pinCode: {
    input: document.getElementById('pinCode'),
    error: document.getElementById('pinCodeError')
  },
  country: {
    input: document.getElementById('country'),
    error: document.getElementById('countryError')
  }
};

const termsCheckbox = document.getElementById('terms');
const termsError = document.getElementById('termsError');

// Helper functions for UI state
function setFieldState(name, isValid, message = '') {
  const entry = fieldMap[name];
  const group = entry.input.closest('.field-group');

  if (!group) return;

  if (entry.input.value.trim() === '') {
    group.classList.remove('success', 'error');
  } else if (isValid) {
    group.classList.remove('error');
    group.classList.add('success');
  } else {
    group.classList.remove('success');
    group.classList.add('error');
  }

  entry.error.textContent = message;
}

function resetFieldStates() {
  Object.keys(fieldMap).forEach((name) => {
    const entry = fieldMap[name];
    const group = entry.input.closest('.field-group');
    if (group) {
      group.classList.remove('success', 'error');
    }
    entry.error.textContent = '';
  });

  termsError.textContent = '';
  strengthBar.className = 'strength-bar';
  strengthText.textContent = '';
}

// Validation functions
function validateFullName() {
  const value = fieldMap.fullName.input.value.trim();

  if (!value) {
    setFieldState('fullName', false, 'Full Name is required.');
    return false;
  }

  if (value.length < 3) {
    setFieldState('fullName', false, 'Full Name must be at least 3 characters.');
    return false;
  }

  if (!/^[A-Za-z\s]+$/.test(value)) {
    setFieldState('fullName', false, 'Only alphabets and spaces are allowed.');
    return false;
  }

  setFieldState('fullName', true);
  return true;
}

function validateEmail() {
  const value = fieldMap.email.input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    setFieldState('email', false, 'Email is required.');
    return false;
  }

  if (!emailPattern.test(value)) {
    setFieldState('email', false, 'Please enter a valid email address.');
    return false;
  }

  setFieldState('email', true);
  return true;
}

function validateMobile() {
  const value = fieldMap.mobile.input.value.trim();

  if (!value) {
    setFieldState('mobile', false, 'Mobile Number is required.');
    return false;
  }

  if (!/^\d{10}$/.test(value)) {
    setFieldState('mobile', false, 'Mobile Number must be exactly 10 digits.');
    return false;
  }

  setFieldState('mobile', true);
  return true;
}

function validatePassword() {
  const value = fieldMap.password.input.value;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!value) {
    setFieldState('password', false, 'Password is required.');
    return false;
  }

  if (!passwordPattern.test(value)) {
    setFieldState('password', false, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
    return false;
  }

  setFieldState('password', true);
  return true;
}

function validateConfirmPassword() {
  const password = fieldMap.password.input.value;
  const confirmPassword = fieldMap.confirmPassword.input.value;

  if (!confirmPassword) {
    setFieldState('confirmPassword', false, 'Please confirm your password.');
    return false;
  }

  if (confirmPassword !== password) {
    setFieldState('confirmPassword', false, 'Passwords do not match.');
    return false;
  }

  setFieldState('confirmPassword', true);
  return true;
}

function validateDob() {
  const value = fieldMap.dob.input.value;

  if (!value) {
    setFieldState('dob', false, 'Date of Birth is required.');
    return false;
  }

  const inputDate = new Date(value);
  const today = new Date();
  const minimumAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  if (inputDate > minimumAgeDate) {
    setFieldState('dob', false, 'You must be at least 18 years old.');
    return false;
  }

  setFieldState('dob', true);
  return true;
}

function validateAddress() {
  const value = fieldMap.address.input.value.trim();

  if (!value) {
    setFieldState('address', false, 'Address is required.');
    return false;
  }

  if (value.length < 10) {
    setFieldState('address', false, 'Address must be at least 10 characters long.');
    return false;
  }

  setFieldState('address', true);
  return true;
}

function validateTextField(name, fieldName, message) {
  const value = fieldMap[name].input.value.trim();

  if (!value) {
    setFieldState(name, false, `${fieldName} is required.`);
    return false;
  }

  if (!/^[A-Za-z\s]+$/.test(value)) {
    setFieldState(name, false, `${fieldName} must contain only alphabets and spaces.`);
    return false;
  }

  setFieldState(name, true);
  return true;
}

function validateCity() {
  return validateTextField('city', 'City');
}

function validateState() {
  return validateTextField('state', 'State');
}

function validatePinCode() {
  const value = fieldMap.pinCode.input.value.trim();

  if (!value) {
    setFieldState('pinCode', false, 'PIN Code is required.');
    return false;
  }

  if (!/^\d{6}$/.test(value)) {
    setFieldState('pinCode', false, 'PIN Code must be exactly 6 digits.');
    return false;
  }

  setFieldState('pinCode', true);
  return true;
}

function validateCountry() {
  const value = fieldMap.country.input.value;

  if (!value) {
    setFieldState('country', false, 'Please select a country.');
    return false;
  }

  setFieldState('country', true);
  return true;
}

function validateGender() {
  const value = fieldMap.gender.input.value;

  if (!value) {
    setFieldState('gender', false, 'Please select your gender.');
    return false;
  }

  setFieldState('gender', true);
  return true;
}

function validateTerms() {
  if (!termsCheckbox.checked) {
    termsError.textContent = 'You must accept the terms and conditions.';
    return false;
  }

  termsError.textContent = '';
  return true;
}

function updatePasswordStrength() {
  const value = fieldMap.password.input.value;
  let score = 0;

  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  strengthBar.className = 'strength-bar';
  strengthText.textContent = '';

  if (value.length === 0) {
    return;
  }

  if (score <= 2) {
    strengthBar.classList.add('weak');
    strengthText.textContent = 'Weak password';
    strengthText.style.color = 'var(--danger)';
  } else if (score <= 3) {
    strengthBar.classList.add('fair');
    strengthText.textContent = 'Fair password';
    strengthText.style.color = '#ffb23f';
  } else if (score <= 4) {
    strengthBar.classList.add('good');
    strengthText.textContent = 'Good password';
    strengthText.style.color = '#3bb4ff';
  } else {
    strengthBar.classList.add('strong');
    strengthText.textContent = 'Strong password';
    strengthText.style.color = 'var(--success)';
  }
}

// Validate on input and blur
Object.keys(fieldMap).forEach((key) => {
  const entry = fieldMap[key];

  entry.input.addEventListener('input', () => {
    if (key === 'password') {
      validatePassword();
      updatePasswordStrength();
      if (fieldMap.confirmPassword.input.value) {
        validateConfirmPassword();
      }
    } else if (key === 'confirmPassword') {
      validateConfirmPassword();
    } else if (key === 'fullName') {
      validateFullName();
    } else if (key === 'email') {
      validateEmail();
    } else if (key === 'mobile') {
      validateMobile();
    } else if (key === 'dob') {
      validateDob();
    } else if (key === 'gender') {
      validateGender();
    } else if (key === 'address') {
      validateAddress();
    } else if (key === 'city') {
      validateCity();
    } else if (key === 'state') {
      validateState();
    } else if (key === 'pinCode') {
      validatePinCode();
    } else if (key === 'country') {
      validateCountry();
    }
  });

  entry.input.addEventListener('blur', () => {
    if (key === 'fullName') {
      validateFullName();
    } else if (key === 'email') {
      validateEmail();
    } else if (key === 'mobile') {
      validateMobile();
    } else if (key === 'password') {
      validatePassword();
      updatePasswordStrength();
    } else if (key === 'confirmPassword') {
      validateConfirmPassword();
    } else if (key === 'dob') {
      validateDob();
    } else if (key === 'gender') {
      validateGender();
    } else if (key === 'address') {
      validateAddress();
    } else if (key === 'city') {
      validateCity();
    } else if (key === 'state') {
      validateState();
    } else if (key === 'pinCode') {
      validatePinCode();
    } else if (key === 'country') {
      validateCountry();
    }
  });
});

termsCheckbox.addEventListener('change', validateTerms);

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const input = document.getElementById(targetId);

    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = 'Hide';
    } else {
      input.type = 'password';
      button.textContent = 'Show';
    }
  });
});

function validateAllFields() {
  const validations = [
    validateFullName(),
    validateEmail(),
    validateMobile(),
    validatePassword(),
    validateConfirmPassword(),
    validateDob(),
    validateGender(),
    validateAddress(),
    validateCity(),
    validateState(),
    validatePinCode(),
    validateCountry(),
    validateTerms()
  ];

  return validations.every(Boolean);
}

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validateAllFields()) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    form.reset();
    resetFieldStates();
    strengthBar.className = 'strength-bar';
    strengthText.textContent = '';
  }
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
});
