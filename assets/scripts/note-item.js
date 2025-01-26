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

  // editNote(data) {
  //   // Show the popup and populate it with current data
  //   const popup = document.querySelector("#edit-popup");
  //   const titleInput = document.querySelector("#edit-title");
  //   const bodyTextarea = document.querySelector("#edit-body");

  //   titleInput.value = data.title;
  //   bodyTextarea.value = data.body;

  //   popup.style.display = "flex"; // Show the popup

  //   const saveButton = document.querySelector("#save-edit");
  //   const cancelButton = document.querySelector("#cancel-edit");

  //   // Handle save action
  //   saveButton.onclick = () => {
  //     data.title = titleInput.value;
  //     data.body = bodyTextarea.value;

  //     // Update the note in the notesData array
  //     const index = notesData.findIndex((note) => note.id === data.id);
  //     if (index !== -1) {
  //       notesData[index] = data;
  //       renderNotes();
  //       saveNotesData(); // Save updated data to localStorage
  //     }

  //     // Close the popup
  //     popup.style.display = "none";
  //   };

  //   // Handle cancel action
  //   cancelButton.onclick = () => {
  //     popup.style.display = "none"; // Close the popup without saving
  //   };
  // }

  editNote(data) {
    const noteFormUpdate = document.querySelector("note-form-update");
    console.log("Attempting to open modal for note: ", data);
    if (noteFormUpdate) {
      noteFormUpdate.openModal(data); // Pass the note data to the edit form
    }
  }
}

customElements.define("note-item", NoteItem);
