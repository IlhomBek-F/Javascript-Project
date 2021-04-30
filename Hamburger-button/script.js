const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const nav = document.getElementById("nav");

btn1.addEventListener("click", () => {
  nav.classList.add("active");
});

btn2.addEventListener("click", () => {
  nav.classList.remove("active");
  nav.classList.add("close");
  console.log("heyy");
});
