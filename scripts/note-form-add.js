// **dist/scripts/note-form-add.js**
class NoteFormAdd extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="note-form">
        <input type="text" id="note-title" placeholder="Title" required>
        <textarea id="note-body" placeholder="Write your note here..." required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;

    this.querySelector('#note-form').addEventListener(
      'submit',
      this.handleSubmit
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.querySelector('#note-title').value;
    const body = this.querySelector('#note-body').value;

    if (title && body) {
      // Kirim event custom dengan data title dan body
      const addNoteEvent = new CustomEvent('addNote', {
        detail: { title, body },
      });
      document.dispatchEvent(addNoteEvent);
    } else {
      alert('Title and body cannot be empty!');
    }
  };
}

customElements.define('note-form-add', NoteFormAdd);