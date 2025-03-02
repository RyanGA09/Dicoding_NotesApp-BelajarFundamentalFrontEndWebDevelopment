// **assets/js/scripts.js**
// Import scripts dynamically

import '../css/styles.css'; // Sesuaikan path dengan struktur folder Anda

// Deklarasikan variabel notesData secara global
let notesData = [];

const scripts = [
  'app-bar',
  'note-form-add',
  'note-form-update',
  'note-item',
  'app-footer',
  'loading-indicator', // Tambahkan loading-indicator ke dalam daftar script
];

const loadScripts = () => {
  const scriptPromises = scripts.map((script) => {
    return new Promise((resolve) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = `scripts/${script}.js`; // Perbaiki path ke folder scripts/
      scriptElement.onload = () => {
        console.log(`${script} loaded successfully`);
        resolve(); // Mark this script as loaded
      };
      document.body.appendChild(scriptElement);
    });
  });

  // Wait until all scripts are loaded
  Promise.all(scriptPromises).then(() => {
    fetchNotesData(); // Now that all scripts are loaded, fetch the notes data
  });
};

// Fungsi untuk menampilkan indikator loading
const showLoading = () => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);
};

// Fungsi untuk menyembunyikan indikator loading
const hideLoading = () => {
  const loadingIndicator = document.querySelector('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
};

// Fetch data dari API
const fetchNotesData = async (archived = false) => {
  showLoading(); // Tampilkan indikator loading
  try {
    const url = archived
      ? 'https://notes-api.dicoding.dev/v2/notes/archived'
      : 'https://notes-api.dicoding.dev/v2/notes';

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
      );
    }

    const data = await response.json();
    console.log('Data from API:', data); // Log data dari API
    notesData = data.data; // Simpan data catatan ke variabel global notesData
    renderNotes(archived); // Render catatan ke UI sesuai status arsip
  } catch (error) {
    console.error('Failed to fetch notes data:', error);
    alert(`Failed to fetch notes: ${error.message}`);
  } finally {
    hideLoading(); // Sembunyikan indikator loading
  }
};

// Fungsi untuk menambahkan catatan baru
const addNote = async (title, body) => {
  showLoading(); // Tampilkan indikator loading
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    await fetchNotesData(); // Ambil data terbaru setelah menambahkan catatan
  } catch (error) {
    console.error('Failed to add note:', error);
    alert('Failed to add note. Please try again.'); // Tampilkan pesan error
  } finally {
    hideLoading(); // Sembunyikan indikator loading
  }
};

// Fungsi untuk menghapus catatan
const deleteNote = async (id) => {
  showLoading(); // Tampilkan indikator loading
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    await fetchNotesData(); // Ambil data terbaru setelah menghapus catatan
  } catch (error) {
    console.error('Failed to delete note:', error);
    alert('Failed to delete note. Please try again.'); // Tampilkan pesan error
  } finally {
    hideLoading(); // Sembunyikan indikator loading
  }
};

// Fungsi untuk mengarsipkan catatan
const archiveNote = async (id) => {
  showLoading(); // Tampilkan indikator loading
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    await fetchNotesData(); // Ambil data terbaru setelah mengarsipkan catatan
  } catch (error) {
    console.error('Failed to archive note:', error);
    alert('Failed to archive note. Please try again.'); // Tampilkan pesan error
  } finally {
    hideLoading(); // Sembunyikan indikator loading
  }
};

// Fungsi untuk membatalkan pengarsipan catatan
const unarchiveNote = async (id) => {
  showLoading(); // Tampilkan indikator loading
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    await fetchNotesData(); // Ambil data terbaru setelah membatalkan pengarsipan
  } catch (error) {
    console.error('Failed to unarchive note:', error);
    alert('Failed to unarchive note. Please try again.'); // Tampilkan pesan error
  } finally {
    hideLoading(); // Sembunyikan indikator loading
  }
};

// Fungsi untuk mengambil catatan yang diarsipkan
// const fetchArchivedNotes = async () => {
//   showLoading();
//   try {
//     const response = await fetch(
//       'https://notes-api.dicoding.dev/v2/notes/archived'
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     notesData = data.data;
//     renderNotes(); // Pastikan ini bisa menangani catatan terarsip
//   } catch (error) {
//     console.error('Failed to fetch archived notes:', error);
//   } finally {
//     hideLoading();
//   }
// };

const fetchArchivedNotes = async () => {
  await fetchNotesData(true); // Ambil data catatan yang diarsipkan
};

// Render Notes
// const renderNotes = (archived = false) => {
//   const notesContainer = document.querySelector('.notes-container');
//   if (!notesContainer) {
//     console.error('notes-container not found in the DOM.');
//     return;
//   }

//   notesContainer.innerHTML = '';

//   const filteredNotes = notesData.filter((note) => note.archived === archived);
//   filteredNotes.forEach((note) => {
//     const noteElement = document.createElement('note-item');
//     noteElement.noteData = note;
//     notesContainer.appendChild(noteElement);
//   });
// };

const renderNotes = (archived = false) => {
  const notesContainer = document.querySelector('.notes-container');
  if (!notesContainer) {
    console.error('notes-container not found in the DOM.');
    return;
  }

  notesContainer.innerHTML = '';

  const filteredNotes = notesData.filter((note) => note.archived === archived);
  console.log(
    `Rendering ${archived ? 'archived' : 'active'} notes:`,
    filteredNotes
  );

  filteredNotes.forEach((note) => {
    const noteElement = document.createElement('note-item');
    noteElement.noteData = note;
    notesContainer.appendChild(noteElement);
  });
};

// Pasang event listener untuk event custom 'addNote'
document.addEventListener('addNote', (event) => {
  const { title, body } = event.detail;
  addNote(title, body); // Panggil fungsi addNote
});

// **assets/js/scripts.js**
document.addEventListener('deleteNote', (event) => {
  const { id } = event.detail;
  deleteNote(id);
});

// **assets/js/scripts.js**
document.addEventListener('archiveNote', (event) => {
  archiveNote(event.detail.id);
});

document.addEventListener('unarchiveNote', (event) => {
  unarchiveNote(event.detail.id);
});

// **assets/js/scripts.js**
document.addEventListener('fetchArchivedNotes', () => {
  fetchArchivedNotes();
});

document.addEventListener('fetchActiveNotes', () => {
  fetchNotesData(false);
});

// Initialize application
loadScripts();
fetchNotesData();
