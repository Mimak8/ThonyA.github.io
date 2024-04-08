const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to load notes from local storage
function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}

// Function to save notes to local storage
function saveNotes() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener to create a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "delete.png"; // Ensure this path is correct
    img.className = "delete-btn";
    notesContainer.appendChild(inputBox).appendChild(img);
    inputBox.focus();
    saveNotes(); // Corrected the function name here
});

// Event delegation for edit and delete operations
notesContainer.addEventListener("input", function(e) {
    if (e.target.classList.contains("input-box")) {
        saveNotes();
    }
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.className === "delete-btn") {
        e.target.parentElement.remove();
        saveNotes();
    }
});

// Handle the Enter key for line breaks in contenteditable
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Load notes when the page loads
loadNotes();


// This function checks the password and loads notes if the password is correct.
function checkPasswordAndLoadNotes() {
    const savedPasswordHash = localStorage.getItem("passwordHash");
    const password = prompt("Please enter the password to access your notes:");

    // Simple hash function for demonstration (DO NOT use in production)
    const inputPasswordHash = simpleHash(password);

    if (inputPasswordHash === savedPasswordHash) {
        loadNotes();
    } else {
        alert("Incorrect password. Access denied.");
    }
}

// A very basic hashing function (for demonstration purposes only)
function simpleHash(input) {
    let hash = 0;
    if (input.length === 0) return hash;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}

// Function to set or update the password (For setup or change password feature)
function setPassword(newPassword) {
    const newPasswordHash = simpleHash(newPassword);
    localStorage.setItem("passwordHash", newPasswordHash);
}

// Example setup call - you might call this from a "Set Password" feature in your app
// setPassword("yourPasswordHere"); // Uncomment and replace with your desired password
setPassword("Jemm")

// Adjust this call to integrate with your app's flow, possibly at the start.
checkPasswordAndLoadNotes();
