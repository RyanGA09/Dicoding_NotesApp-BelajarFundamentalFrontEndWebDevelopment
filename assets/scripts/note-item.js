// **scripts/note-item.js**
class NoteItem extends HTMLElement {
  set noteData(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note-item">
          <h3>${this.data.title}</h3>
          <p>${this.data.body}</p>
          <small>${new Date(this.data.createdAt).toLocaleString()}</small>
          <button class="edit-btn" data-id="${this.data.id}">Edit</button>
          <button class="delete-btn" data-id="${this.data.id}">Delete</button>
      </div>
    `;
    this.querySelector(".delete-btn").addEventListener("click", () =>
      this.deleteNote(this.data.id)
    );

    this.querySelector(".edit-btn").addEventListener("click", () =>
      this.editNote(this.data)
    );
  }

  deleteNote(id) {
    const index = notesData.findIndex((note) => note.id === id);
    if (index !== -1) {
      notesData.splice(index, 1);
      renderNotes();
      saveNotesData(); // Save updated data to localStorage
    }
  }

  editNote(data) {
    // Populate the form fields with the note data
    const titleInput = document.querySelector("#note-title");
    const bodyTextarea = document.querySelector("#note-body");
    const form = document.querySelector("#note-form");

    titleInput.value = data.title;
    bodyTextarea.value = data.body;

    // Add a temporary "editing" class to the form
    form.classList.add("editing");

    // Save changes on form submission
    const saveEdit = (event) => {
      event.preventDefault();
      data.title = titleInput.value;
      data.body = bodyTextarea.value;

      // Update notesData and rerender notes
      const index = notesData.findIndex((note) => note.id === data.id);
      if (index !== -1) {
        notesData[index] = data;
        renderNotes();
        saveNotesData(); // Save updated data to localStorage
      }

      // Reset the form
      form.reset();
      form.classList.remove("editing");
      form.removeEventListener("submit", saveEdit);
    };

    form.addEventListener("submit", saveEdit);
  }
}

customElements.define("note-item", NoteItem);
