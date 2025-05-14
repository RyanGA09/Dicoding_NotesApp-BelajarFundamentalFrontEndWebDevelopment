# 🗒️ Dicoding Submission - NotesApp (Belajar Fundamental FrontEnd Web Development (Learn FrontEnd Web Development Fundamentals))

## 👤 Author

Ryan Gading Abdullah

## 📅 Date Created

January 2025

## 📝 Description

Dicoding NotesApp is a simple note-taking application built to fulfill the submissions for the **Learn FrontEnd Web Development Fundamentals** course on Dicoding. This app aims to help users create and manage notes effectively.

### 📦 Submission 1: Building the Notes App

In this submission, the NotesApp was developed with the following basic features:

- 🆕 Create new notes.
- 📋 View the list of existing notes.
- 🗑️ Delete & ✏️ edit notes from the list.
- 🌐 Notes data is fetched from a JSON file using the **fetch API**.
- 🧩 Utilizes **Custom Elements** to build reusable components.

### 🚀 Submission 2: Integrating the Notes App with a RESTful API

In the second submission, the NotesApp has been enhanced to integrate with a RESTful API provided by Dicoding. The app now includes the following advanced features:

- 🔗 Fetch notes from a RESTful API: Notes data is now fetched from the Dicoding Notes API [https://notes-api.dicoding.dev/v2/notes](https://notes-api.dicoding.dev/v2/notes).
- 📦 Archive and Unarchive notes: Users can archive or unarchive notes, which moves them between the "Archived Notes" and "Active Notes" sections.
- ⚡ Real-time updates: The app dynamically updates the UI when notes are added, deleted, archived, or unarchived.
- ⏳ Loading indicators: A loading indicator is displayed while fetching data or performing actions like adding, deleting, or archiving notes.
- ❗ Error handling: The app provides user-friendly error messages when API requests fail.
- 📢 Custom Events: The app uses Custom Events to handle actions like adding, deleting, archiving, and unarchiving notes, ensuring a decoupled and modular architecture.

#### 🧩 Key Features in Submission 2

1. 🔗 RESTful API Integration:

   - Fetch active and archived notes from the API.
   - Add new notes to the API.
   - Delete notes from the API.
   - Archive and unarchive notes using the API.

2. ⚙️ Dynamic UI Updates:

   - The UI automatically updates when notes are added, deleted, archived, or unarchived.
   - Notes are categorized into "Archived Notes" and "Active Notes" sections.

3. 🧱 Custom Components:

   - note-item: Displays a single note with options to edit, delete, and archive/unarchive.
   - note-form-add: A form for adding new notes.
   - note-form-update: A modal form for editing existing notes.
   - loading-indicator: Displays a loading spinner during API requests.
   - app-bar: A header component displaying the app title.
   - app-footer: A footer component with copyright information.

4. 🔁 Event-Driven Architecture:

   - The app uses Custom Events to handle user actions like adding, deleting, archiving, and unarchiving notes.
   - Events like addNote, deleteNote, archiveNote, and unarchiveNote are dispatched and handled by the appropriate functions.

5. ❗ Error Handling:

   - The app provides clear error messages when API requests fail, ensuring a smooth user experience.

6. 📱 Responsive Design:

   - The app is designed to be responsive and works well on both desktop and mobile devices.

## 📄 LICENSE

Copyright &copy; 2025 Ryan Gading Abdullah. All rights reserved.

This project is licensed under the MIT License - see the [MIT LICENSE](LICENSE) for details.
