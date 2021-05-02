function appleCreate() {
  const apple = document.createElement("div");

  apple.classList.add("apple");

  apple.style.left = Math.random() * 100 + "vw";
  apple.style.animationDuration = Math.random() * 2 + 3 + "s";

  apple.innerHTML = "<i class='fab fa-apple'></i>";

  document.body.appendChild(apple);

  setInterval(() => {
    apple.remove();
  }, 5000);
}

setInterval(appleCreate, 400);
