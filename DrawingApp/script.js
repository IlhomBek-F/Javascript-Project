const canvas = document.getElementById("canvas");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const ctx = canvas.getContext("2d");
const spanSize = document.querySelector("span");
const colorChange = document.getElementById("color");
const clearBtn = document.getElementById("clear");

let size = 5;
let isPressed = false;
let color = "";
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    Drawline(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function Drawline(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
increase.addEventListener("click", () => {
  size += 5;
  if (size > 40) {
    size = 40;
  }
  spanSize.innerHTML = size + " px";
});

decrease.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  spanSize.innerHTML = size + " px";
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.clientHeight);
});
colorChange.addEventListener("change", (e) => {
  color = e.target.value;
});
