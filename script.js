// 🚀 Render backend URL
const backendURL = "https://career-backend-9w86.onrender.com";

const form = document.getElementById("bookingForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form data
    const data = {
        name: document.getElementById("name").value,
        college: document.getElementById("college").value,
        sessionType: document.getElementById("sessionType").value,
        duration: document.getElementById("duration").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };

    // ✅ Debugging
    console.log("Form submitted!", data);
    alert("Form submitted!");

    try {
        const response = await fetch(`${backendURL}/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
        messageDiv.textContent = result.message;
        form.reset();
    } catch (error) {
        console.error("Error:", error);
        messageDiv.textContent = "Error submitting booking.";
    }
});