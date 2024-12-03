window.onload = function() {
    // Your Firebase and Firestore code here (including postNote)
  
    // Post Note function
    function postNote() {
      // Code to post note
    }
  
    // Display Notes function
    function displayNotes() {
      // Code to display notes
    }
  }
  

// Function to display notes
function displayNotes() {
    db.collection("notes")
      .orderBy("timestamp", "desc") // Order by most recent
      .onSnapshot((querySnapshot) => {
        const notesList = document.getElementById("notes-list");
        notesList.innerHTML = ""; // Clear current list
  
        querySnapshot.forEach((doc) => {
          const note = doc.data();
          const noteItem = document.createElement("div");
          noteItem.classList.add("note-item");
  
          noteItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Posted by: ${note.userId} at ${note.timestamp.toDate()}</small>
          `;
  
          notesList.appendChild(noteItem);
        });
      });
  }
  
  // Call the display function when the page loads
  window.onload = displayNotes;
  

  document.getElementById('post-note-btn').addEventListener('click', () => {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
  
    if (title && content) {
      postNote(title, content);  // Call the function to post the note
    } else {
      alert("Please provide both a title and content.");
    }
  });

  
  // Handle authentication state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('new-note-section').style.display = 'block';
    } else {
      document.getElementById('login-section').style.display = 'block';
      document.getElementById('new-note-section').style.display = 'none';
    }
  });
  