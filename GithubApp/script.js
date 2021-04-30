const GIT_API = "https://api.github.com/users/";

const form = document.getElementById("form");

const search = document.getElementById("search");

const main = document.getElementById("main");

const count = document.getElementById("count");

const show = document.getElementById("show");

const favDiv = document.getElementById("favorite");

const deleteEl = document.getElementById("delete");

let counter = 0;
counterFunc();
getGitUser("IlhomBek-F");

async function getGitUser(input) {
  const gitResp = await fetch(GIT_API + input);

  const data = await gitResp.json();

  userCard(data);
  getRepos(input);
  deleteFunc(data);
  console.log(data);
}

async function getRepos(input) {
  const gitResp = await fetch(GIT_API + input + "/repos");

  const data = await gitResp.json();

  console.log(data);

  addToRepo(data);
}

function userCard(data) {
  const {
    avatar_url,
    location,
    name,
    bio,
    followers,
    following,
    public_repos,
  } = data;
  const cardHtml = `
  <button id="fav" class="favBtn"><i class="fas fa-heart"></i></button>
  <div class="card">
    <div>
    <img class="avatar" src="${avatar_url}" />
    </div>
    <div class="user-info">
    <h2>${name}</h2>
    <p>${bio}</p>
    <ul class="info">
    <li>${location}</li>
    <li><strong>Followers </strong> ${followers}</li>
    <li><strong>Following </strong> ${following}</li>
    <li><strong>Repos </strong> ${public_repos}</li>
    </ul>
    <div class="repos" id="repos"></div>
    </div>
   
    </div>
    `;
  main.innerHTML = cardHtml;

  fav.addEventListener("click", () => {
    addTolocal(data);
    counterFunc();
  });
}

function counterFunc() {
  const names = getFromLocal();
  count.innerHTML = counter++;
  count.innerHTML = names.length;
}

function addTolocal(data) {
  const getFromLS = getFromLocal();
  const getid = getId();
  console.log(data);
  localStorage.setItem("github", JSON.stringify([...getFromLS, data]));
  localStorage.setItem("user", JSON.stringify([...getid, data.id]));
}

function getFromLocal() {
  const data = JSON.parse(localStorage.getItem("github"));

  return data === null ? [] : data;
  //   return data;
}

function getId(){
  const dataId = JSON.parse(localStorage.getItem("user"));

  return dataId === null ? [] : dataId
}
// sort by stars data.sort((a , b) => b.stargezers_count - a.stargazers_count)

function addToRepo(data) {
  const reposEl = document.getElementById("repos");

  data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach((repo) => {
      const repoLink = document.createElement("a");
      repoLink.classList.add("repo");

      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.innerHTML = repo.name;

      reposEl.appendChild(repoLink);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = search.value;

  if (input) {
    getGitUser(input);

    search.value = "";
  }
});

show.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  showFavorite();
});

function showFavorite() {
  const favorite = getFromLocal();

  console.log(favorite);
  favorite.forEach((user) => {
    showMeAll(user);
  });
}

function showMeAll(user) {
  const {
    avatar_url,
    location,
    name,
    bio,
    followers,
    following,
    public_repos,
  } = user;
  const div = document.createElement("div");
  div.classList.add("favorite");
  div.innerHTML = `
    <div>
  <button id="fav" class="favBtn"><i class="fas fa-heart"></i></button>
  <div class="card">
    <div>
    <img class="avatar" src="${avatar_url}" />
    </div>
    <div class="user-info">
    <h2>${name}</h2>
    <p>${bio}</p>
    <ul class="info">
    <li>${location}</li>
    <li><strong>Followers </strong> ${followers}</li>
    <li><strong>Following </strong> ${following}</li>
    <li><strong>Repos </strong> ${public_repos}</li>
    </ul>
    <div class="repos" id="repos"></div>
    </div>
    </div>
     </div>`;
  console.log(div);

  favDiv.appendChild(div);
}

deleteEl.addEventListener("click", () => {
  deleteFunc();
});

function deleteFunc() {
  const getId = getFromLocal();
  getId.forEach((element) => {
    localStorage.removeItem("github", element);
  });
}
