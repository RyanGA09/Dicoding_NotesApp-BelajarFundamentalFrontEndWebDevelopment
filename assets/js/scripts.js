// **js/scripts.js**
// Import scripts dynamically
const scripts = ["app-bar", "note-form", "note-item", "app-footer"];
const loadScripts = () => {
  scripts.forEach((script) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = `assets/scripts/${script}.js`;
    document.body.appendChild(scriptElement);
  });
};

// Global variables
let notesData = [];

// Fetch data dari file JSON
const fetchNotesData = async () => {
  try {
    const response = await fetch("assets/notes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    notesData = await response.json();
    renderNotes();
  } catch (error) {
    console.error("Failed to fetch notes data:", error);
  }
};

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

// Initialize application
loadScripts();
fetchNotesData();
