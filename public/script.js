const socket = io();
let username, room;

function joinChat() {
    username = document.getElementById("username").value.trim();
    room = document.getElementById("room").value.trim();

    if (username && room) {
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("chatBox").style.display = "block";
        document.getElementById("roomTitle").innerText = `Room: ${room}`;

        socket.emit("joinRoom", { username, room });
    } else {
        alert("Please enter a name and room!");
    }
}

function sendMessage() {
    const message = document.getElementById("message").value.trim();
    
    if (message) {
        socket.emit("chatMessage", { username, room, message });
        document.getElementById("message").value = "";
    }
}

socket.on("message", (data) => {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");

    messageElement.classList.add("message", data.username === username ? "user" : "others");
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
