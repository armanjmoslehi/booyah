// Function to display notes
function displayNotes() {
    const notesList = document.getElementById("notes-list");
  
    db.collection("notes")
      .orderBy("timestamp", "desc") // Order by most recent
      .onSnapshot((querySnapshot) => {
        notesList.innerHTML = ""; // Clear current notes
  
        querySnapshot.forEach((doc) => {
          const note = doc.data();
          const noteItem = document.createElement("div");
          noteItem.classList.add("note-item");
  
          noteItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Posted at ${note.timestamp.toDate().toLocaleString()}</small>
          `;
  
          notesList.appendChild(noteItem);
        });
      });
  }
  
  // Call the display function when the page loads
  window.onload = displayNotes;
  
  