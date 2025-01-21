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
