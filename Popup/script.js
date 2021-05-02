const openBtn = document.getElementById("open");

const closeBtn = document.getElementById("close");
const popContainer = document.getElementById("container");

openBtn.addEventListener("click", () => {
  popContainer.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  popContainer.classList.remove("open");
});
