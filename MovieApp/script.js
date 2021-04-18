const API_KEY = "04c35731a5ee918f014970082a0088b1";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const searchApi =
  "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieImg = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");

const form = document.getElementById("form");

const favoriteContainer = document.getElementById("favorite-container");

const myFavBtn = document.getElementById("myFav");
getMovies();
async function getMovies() {
  const response = await fetch(API_URL);

  const resp = await response.json();

  resp.results.forEach((movie) => {
    infoMovie(movie);
  });
}

function infoMovie(movie) {
  const div = document.createElement("div");
  div.classList.add("movie");
  div.innerHTML = `
   
      <img
          src="${movieImg + movie.poster_path}"
      />
      <div class="movie_info">
        <h3>${movie.title}</h3>
        <button id="fav"><i class="fas fa-info"></i></button>
        <span class="${getRate(movie.vote_average)}">${
    movie.vote_average
  }</span>
      </div>
  
  `;

  const btn = div.querySelector(".movie .movie_info #fav");

  btn.addEventListener("click", (e) => {
    AddtoLocal(movie);
    e.preventDefault();
    main.innerHTML = "";

    getMyFavoriteMovie();
  });

  main.appendChild(div);
}

function getRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else if (vote <= 5) {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = search.value;
  if (searchText) {
    main.innerHTML = "";
    searchMovie(searchText);
    favoriteContainer.innerHTML = "";
    myFavBtn.classList.add("showMe");
  }
});

async function searchMovie(text) {
  const resp = await fetch(searchApi + text);

  const response = await resp.json();

  addSearchMovie(response);
}

function addSearchMovie(resp) {
  console.log(resp.results);
  resp.results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");
    div.innerHTML = `
         
            <img
                src="${movieImg + movie.poster_path}"
            />
            <div class="movie_info">
              <h3>${movie.title}</h3>
              <div><button id="fav"><i class="fas fa-info"></i></button>
              <span class="${getRate(movie.vote_average)}">${
      movie.vote_average
    }</span></div>
            </div>
        
        `;
    const btn = div.querySelector(".movie .movie_info #fav");

    btn.addEventListener("click", (e) => {
      AddtoLocal(movie);
      e.preventDefault();
      main.innerHTML = "";

      getMyFavoriteMovie();
    });
    main.appendChild(div);
  });

  search.value = "";
  console.log(resp);
}

function AddtoLocal(movie) {
  const movieFromLS = getFromLocal();

  localStorage.setItem("movieStorage", JSON.stringify([movie]));
}

function getFromLocal() {
  const movieTitle = JSON.parse(localStorage.getItem("movieStorage"));

  return movieTitle === null ? [] : movieTitle;
}

myFavBtn.addEventListener("click", (e) => {
  favoriteContainer.innerHTML = "";
  const fromLs = getFromLocal();

  localStorage.setItem("movieStorage", JSON.stringify(fromLs === []));
});

function getMyFavoriteMovie() {
  const LSfunction = getFromLocal();
  LSfunction.forEach((movis) => {
    showMovie(movis);
  });
}

function showMovie(movie) {
  const div = document.createElement("div");
  div.classList.add("favorite-container");
  div.innerHTML = `
  <h1>${movie.title}</h1>
  <div class="show">
 
  <div class="img-class"><img
  src="${movieImg + movie.poster_path}"
/></div>
        <div class="info-class">
          <h2>Language: ${movie.original_language}</h2>
          <h2>Title: ${movie.title}</h2>
          <h2>Date: ${movie.release_date}</h2>
          <h2>Vote-count: ${movie.vote_count}</h2>
          <h2  class="${getRate(movie.vote_average)}">Vote: ${
    movie.vote_average
  }</h2>
  <h3>${movie.overview}</h3>
        </div>
  </div>
 `;

  favoriteContainer.appendChild(div);
}
