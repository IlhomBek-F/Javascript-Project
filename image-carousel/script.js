const images = document.getElementById("images");

const img = document.querySelectorAll("#images img");

let index = 0;

function nextImg() {
  index++;
  if (index > img.length - 1) {
    index = 0;
  }

  images.style.transform = `translateX(${-index * 500}px)`;
}

setInterval(nextImg, 2000);
