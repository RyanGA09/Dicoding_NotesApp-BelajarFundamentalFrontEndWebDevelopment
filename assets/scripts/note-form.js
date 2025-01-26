// **scripts/note-form.js**
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

    const form = event.target;
    const title = document.querySelector("#note-title").value;
    const body = document.querySelector("#note-body").value;

    if (form.classList.contains("editing")) {
      // Prevent adding a new note when editing
      return;
    }

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
