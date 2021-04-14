const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((notes) => {
    AddNote(notes);
  });
}
addBtn.addEventListener("click", () => {
  AddNote();
});

function AddNote(notes = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
  <div class="notes">
<div class="tools">
  <button class="edit"><i class="fas fa-edit"></i></button>
  <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main ${notes ? "" : "hidden"}"></div>
<textarea class="${notes ? "hidden" : ""}"></textarea>
</div>
  `;

  const notesEl = note.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const mainEl = note.querySelector(".main");

  const textarea = note.querySelector("textarea");

  textarea.value = notes;
  mainEl.innerHTML = marked(notes);

  editBtn.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    upDateLS();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;

    mainEl.innerHTML = marked(value);

    upDateLS();
  });

  document.body.appendChild(note);
}

function upDateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
