// Sample Data
const sampleNotes = [
  { id: 1, title: "First Note", body: "This is the first note." },
  { id: 2, title: "Second Note", body: "This is the second note." },
];

// Custom Element: App Bar
class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header><h1>Notes App</h1></header>`;
  }
}
customElements.define("app-bar", AppBar);

// Custom Element: Note Item
class NoteItem extends HTMLElement {
  set noteData(data) {
    this.innerHTML = `
            <div>
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            </div>
        `;
  }
}
customElements.define("note-item", NoteItem);

// Custom Element: Note Form
class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <form id="note-form">
                <input type="text" id="note-title" placeholder="Title" required>
                <textarea id="note-body" placeholder="Write your note here..." required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;
    this.querySelector("#note-form").addEventListener("submit", this.addNote);
  }

  addNote = (event) => {
    event.preventDefault();
    const title = document.querySelector("#note-title").value;
    const body = document.querySelector("#note-body").value;

    if (title && body) {
      const newNote = { id: Date.now(), title, body };
      sampleNotes.push(newNote);
      renderNotes();
      event.target.reset();
    }
  };
}
customElements.define("note-form", NoteForm);

// Render Notes
const renderNotes = () => {
  const notesContainer = document.querySelector(".notes-container");
  notesContainer.innerHTML = "";

  sampleNotes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.noteData = note;
    notesContainer.appendChild(noteElement);
  });
};

// Initial Render
renderNotes();
