const GIT_API = "https://api.github.com/users/";

const form = document.getElementById("form");

const search = document.getElementById("search");

const main = document.getElementById("main");

getGitUser("IlhomBek-F");

async function getGitUser(input) {
  const gitResp = await fetch(GIT_API + input);

  const data = await gitResp.json();

  userCard(data);
  getRepos(input);
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
