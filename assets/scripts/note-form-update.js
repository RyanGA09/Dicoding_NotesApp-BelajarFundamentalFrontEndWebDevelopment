class NoteFormUpdate extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                                <div id="edit-popup" class="popup">
                                    <div class="popup-content">
                                        <h2>Edit Note</h2>
                                        <input type="text" id="edit-title" placeholder="Title" required>
                                        <textarea id="edit-body" placeholder="Edit your note..." required></textarea>
                                        <button class="editing-btn" id="save-edit">Save</button>
                                        <button id="cancel-edit">Cancel</button>
                                    </div>
                                </div>
                            `;

        // Bind cancel and save actions to their respective buttons
        this.querySelector("#save-edit").addEventListener("click", this.updateNote);
        this.querySelector("#cancel-edit").addEventListener(
        "click",
        this.closeModal
        );
    }

    // Open the modal and populate it with note data
    // openModal(noteData) {
    //     const titleInput = this.querySelector("#edit-title");
    //     const bodyTextarea = this.querySelector("#edit-body");

    //     titleInput.value = noteData.title;
    //     bodyTextarea.value = noteData.body;

    //     // Set up editing mode on the form
    //     const form = this.querySelector("#note-form");
    //     form.classList.add("editing");
    //     form.dataset.editingId = noteData.id;

    //     document.getElementById("edit-popup").style.display = "flex"; // Show the modal
    // }
    openModal(noteData) {
        const titleInput = this.querySelector("#edit-title");
        const bodyTextarea = this.querySelector("#edit-body");

        // Menampilkan data untuk memastikan noteData ada
        console.log("Opening modal with data: ", noteData);

        titleInput.value = noteData.title;
        bodyTextarea.value = noteData.body;

        // Set up editing mode on the form
        const form = this.querySelector("#note-form");
        form.classList.add("editing");
        form.dataset.editingId = noteData.id;

        const modal = document.getElementById("edit-popup");

        if (modal) {
        modal.classList.add("show"); // Tampilkan modal dengan menambahkan kelas 'show'
        } else {
        console.error("Modal element not found.");
        }
    }

    // Update the note and close the modal
    updateNote = () => {
        const titleInput = document.querySelector("#edit-title");
        const bodyTextarea = document.querySelector("#edit-body");
        const editingId = this.querySelector("#note-form").dataset.editingId;

        const noteIndex = notesData.findIndex((note) => note.id === editingId);
        if (noteIndex !== -1) {
        // Update note data
        notesData[noteIndex].title = titleInput.value;
        notesData[noteIndex].body = bodyTextarea.value;

        renderNotes(); // Re-render notes
        saveNotesData(); // Save updated data to localStorage
        }

        this.closeModal(); // Close modal after saving
    };

    // Close the modal
    closeModal = () => {
        const modal = document.getElementById("edit-popup");
        if (modal) {
          modal.classList.remove("show"); // Sembunyikan modal
        }
    };
}

customElements.define("note-form-update", NoteFormUpdate);
