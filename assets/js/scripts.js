let notesData = []; // Array untuk menyimpan data notes

// Fetch data dari file JSON
const fetchNotesData = async () => {
  try {
    const response = await fetch("notes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    notesData = await response.json();
    renderNotes();
  } catch (error) {
    console.error("Failed to fetch notes data:", error);
  }
};

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
            <div class="note-item">
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <small>${new Date(data.createdAt).toLocaleString()}</small>
                <button class="delete-btn" data-id="${data.id}">Delete</button>
            </div>
        `;
    this.querySelector(".delete-btn").addEventListener("click", () =>
      this.deleteNote(data.id)
    );
  }

  deleteNote(id) {
    const index = notesData.findIndex((note) => note.id === id);
    if (index !== -1) {
      notesData.splice(index, 1);
      renderNotes();
    }
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
      const newNote = {
        id: `notes-${Date.now()}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      notesData.push(newNote);
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

  notesData.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.noteData = note;
    notesContainer.appendChild(noteElement);
  });
};

// Inisialisasi
fetchNotesData();
