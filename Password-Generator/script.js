const passEl = document.getElementById("pass");
const copyEl = document.getElementById("copy");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");

const upperCase = "ABSDEFGHIJKLMNOPQSTUVWXYZ";

const lowerCase = "abcdefghijklmnopqstuvwxyz";

const numbers = "123456789";

const symbols = "!@#$%^&*()_+=";

function getLowerCase() {
  return lowerCase[Math.floor(Math.random() * lowerCase.length)];
}

function getUpperCase() {
  return upperCase[Math.floor(Math.random() * upperCase.length)];
}

function getNumbers() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymolbs() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const len = lengthEl.value;
  let password = "";
  for (let i = 0; i < len; i++) {
    const x = generateX();
    password += x;
  }
  passEl.innerText = password;
}

function generateX() {
  const xs = [];

  if (upperEl.checked) {
    xs.push(getUpperCase());
  }

  if (lowerEl.checked) {
    xs.push(getLowerCase());
  }

  if (numberEl.checked) {
    xs.push(getNumbers());
  }

  if (symbolEl.checked) {
    xs.push(getSymolbs());
  }

  if (xs.length === 0) return "";
  return xs[Math.floor(Math.random() * xs.length)];
}

generateBtn.addEventListener("click", () => {
  generatePassword();
});

copyEl.addEventListener("click", () => {
  const TextArea = document.createElement("textarea");

  const password = passEl.innerText;

  if (!password) {
    return;
  }

  TextArea.value = password;
  document.body.appendChild(TextArea);
  TextArea.select();
  document.execCommand("copy");
  TextArea.remove();
  alert("Password copied to clipboard");
});
