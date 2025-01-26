// **js/scripts.js**
// Import scripts dynamically
const scripts = ["app-bar", "note-form", "note-item", "app-footer"];
// const loadScripts = () => {
//   scripts.forEach((script) => {
//     const scriptElement = document.createElement("script");
//     scriptElement.src = `assets/scripts/${script}.js`;
//     scriptElement.onload = () => {
//       console.log(`${script} loaded successfully`);
//       // After the script is loaded, you can call renderNotes() or other actions
//       if (script === "note-form") {
//         fetchNotesData();
//       }
//     };
//     document.body.appendChild(scriptElement);
//   });
// };

const loadScripts = () => {
  const scriptPromises = scripts.map((script) => {
    return new Promise((resolve) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = `assets/scripts/${script}.js`;
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

// Global variables
// let notesData = [];

// Fetch data dari file JSON
const fetchNotesData = async () => {
  const storedNotes = localStorage.getItem("notesData");

  if (storedNotes) {
    notesData = JSON.parse(storedNotes);
    console.log("Data loaded from localStorage:", notesData);
    renderNotes();
  } else {
    // If no data in localStorage, fetch from the JSON file
    try {
      console.log("Fetching data...");
      const response = await fetch("assets/notes.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      notesData = await response.json();
      console.log("Data fetched from JSON:", notesData);
      renderNotes();
      // Save data to localStorage for future use
      localStorage.setItem("notesData", JSON.stringify(notesData));
    } catch (error) {
      console.error("Failed to fetch notes data:", error);
    }
  }
};

// Render Notes
const renderNotes = () => {
  const notesContainer = document.querySelector(".notes-container");
  if (!notesContainer) {
    console.error("notes-container not found in the DOM.");
    return;
  }

  notesContainer.innerHTML = "";

  notesData.forEach((note) => {
    const noteElement = document.createElement("note-item");
    // const noteElement = document.createElement("div");
    // noteElement.classList.add("note-item");
    noteElement.noteData = note;
    // noteElement.innerHTML = `
    //   <h3>${note.title}</h3>
    //   <p>${note.body}</p>
    //   <small>${new Date(note.createdAt).toLocaleString()}</small>
    // `;
    notesContainer.appendChild(noteElement);
  });
};

// Save notesData to localStorage whenever the notes change
const saveNotesData = () => {
  console.log("Saving notesData to localStorage:", notesData);

  localStorage.setItem("notesData", JSON.stringify(notesData));
};

// Initialize application
loadScripts();
fetchNotesData();
