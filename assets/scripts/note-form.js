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
      // Update existing note
      const editingId = form.dataset.editingId;
      const noteIndex = notesData.findIndex((note) => note.id === editingId);

      if (noteIndex !== -1) {
        notesData[noteIndex].title = title;
        notesData[noteIndex].body = body;
        renderNotes(); // Re-render after update
      }

      // Reset form
      form.reset();
      form.classList.remove("editing");
      delete form.dataset.editingId;
    } else {
      // Add new note
      const newNote = {
        id: `notes-${Date.now()}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      notesData.push(newNote);
      renderNotes(); // Re-render after adding
      saveNotesData(); // Save updated data to localStorage
      form.reset();
    }
  };
}

customElements.define("note-form", NoteForm);
