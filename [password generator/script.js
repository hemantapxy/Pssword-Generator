// const inputSlider = document.querySelector("[data-lengthSlider]");
// const lengthDisplay = document.querySelector("[data-lengthNumber]");

// const passwordDisplay = document.querySelector("[data-passwordDisplay]");
// const copyBtn = document.querySelector


// Select DOM elements
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const lengthSlider = document.querySelector("[data-lengthSlider]");
const lengthNumber = document.querySelector("[data-lengthNumber]");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const strengthIndicator = document.querySelector("[data-indicator]");
const copyButton = document.querySelector("[data-copy]");
const copyMessage = document.querySelector("[data-copyMsg]");
const generateButton = document.querySelector(".generateButtom");

// Character sets
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Update the length display
lengthSlider.addEventListener("input", () => {
  lengthNumber.textContent = lengthSlider.value;
});

// Generate a random character from a string
function getRandomCharacter(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

// Shuffle a string
function shuffleString(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}

// Calculate password strength
function calculateStrength(password) {
  let strength = 0;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:;?><,./\-]/.test(password);

  if (hasUppercase) strength++;
  if (hasLowercase) strength++;
  if (hasNumbers) strength++;
  if (hasSymbols) strength++;

  if (strength <= 1) {
    strengthIndicator.style.backgroundColor = "red";
  } else if (strength === 2) {
    strengthIndicator.style.backgroundColor = "yellow";
  } else {
    strengthIndicator.style.backgroundColor = "green";
  }
}

// Generate password
generateButton.addEventListener("click", () => {
  const length = +lengthSlider.value;
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  let charSet = "";
  if (includeUppercase) charSet += UPPERCASE_CHARS;
  if (includeLowercase) charSet += LOWERCASE_CHARS;
  if (includeNumbers) charSet += NUMBERS;
  if (includeSymbols) charSet += SYMBOLS;

  if (!charSet) {
    passwordDisplay.value = "Select options!";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomCharacter(charSet);
  }

  // Shuffle password to improve randomness
  password = shuffleString(password);

  // Display the password
  passwordDisplay.value = password;

  // Calculate and display strength
  calculateStrength(password);
});

// Copy to clipboard
copyButton.addEventListener("click", () => {
  const password = passwordDisplay.value;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    copyMessage.textContent = "Copied!";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 2000);
  }).catch(() => {
    copyMessage.textContent = "Failed!";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 2000);
  });
});
