document.getElementById("chatbot-widget").addEventListener("click", function() {
    document.getElementById("chat-panel").style.display = "block";
});

document.getElementById("close-chat").addEventListener("click", function() {
    document.getElementById("chat-panel").style.display = "none";
});

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    displayMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    fetch("YOUR_N8N_WEBHOOK_URL", {  // Replace with your n8n webhook URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            displayMessage(data.response, "bot");
        } else {
            displayMessage("Sorry, I didn't get that. Try again!", "bot");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("Error connecting to chatbot. Try again later.", "bot");
    });
}

function displayMessage(text, sender) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    document.getElementById("chat-messages").appendChild(messageDiv);
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}
