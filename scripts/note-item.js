// **scripts/note-item.js**

class NoteItem extends HTMLElement {
  set noteData(data) {
    this.data = data;
    this.render();
  }

  render() {
    const oldContainerId = this.data.archived
      ? 'active-notes'
      : 'archived-notes';
    const newContainerId = this.data.archived
      ? 'archived-notes'
      : 'active-notes';

    const oldContainer = document.getElementById(oldContainerId);
    const newContainer = document.getElementById(newContainerId);

    if (!newContainer) return;

    // Hapus elemen dari container lama agar tidak duplikat
    if (oldContainer) {
      const oldNote = oldContainer.querySelector(`[data-id="${this.data.id}"]`);
      if (oldNote) oldNote.remove();
    }

    // Hapus elemen dari container baru jika sudah ada (untuk mencegah duplikasi saat fetch ulang)
    const existingNote = newContainer.querySelector(
      `[data-id="${this.data.id}"]`
    );
    if (existingNote) {
      existingNote.remove();
    }

    const noteElement = document.createElement('div');
    noteElement.classList.add('note-item');
    noteElement.setAttribute('data-id', this.data.id);
    noteElement.innerHTML = `
      <h3>${this.data.title}</h3>
      <p>${this.data.body}</p>
      <small>${new Date(this.data.createdAt).toLocaleString()}</small>
      <button class="edit-btn" data-id="${this.data.id}">Edit</button>
      <button class="delete-btn" data-id="${this.data.id}">Delete</button>
      <button class="archive-btn" data-id="${this.data.id}">
        ${this.data.archived ? 'Unarchive' : 'Archive'}
      </button>
      ${this.data.archived ? '<p class="archived-message">Catatan ini telah diarsipkan.</p>' : ''}
    `;

    newContainer.appendChild(noteElement);

    // Event listener untuk menghapus catatan
    noteElement.querySelector('.delete-btn').addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('deleteNote', {
          detail: { id: this.data.id },
          bubbles: true,
        })
      );

      // Pastikan hanya elemen dengan ID yang sesuai yang dihapus
      const container = document.getElementById(newContainerId);
      const noteToRemove = container.querySelector(
        `[data-id="${this.data.id}"]`
      );
      if (noteToRemove) {
        noteToRemove.remove();
      }
    });

    // Event listener untuk mengarsipkan/unarsipkan catatan
    noteElement.querySelector('.archive-btn').addEventListener('click', () => {
      this.data.archived = !this.data.archived; // Ubah status arsip langsung di objek data

      document.dispatchEvent(
        new CustomEvent(this.data.archived ? 'archiveNote' : 'unarchiveNote', {
          detail: { id: this.data.id },
          bubbles: true,
        })
      );

      // Pindahkan elemen ke container yang sesuai tanpa menghapus semua tampilan
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('fetchActiveNotes'));
        document.dispatchEvent(new CustomEvent('fetchArchivedNotes'));
      }, 300);
    });
  }

  deleteNote(id) {
    deleteNote(id);
  }

  toggleArchive(id, isArchived) {
    if (isArchived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
  }
}

customElements.define('note-item', NoteItem);
