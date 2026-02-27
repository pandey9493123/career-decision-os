document.getElementById("bookingForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const bookingData = {
        name: document.getElementById("name").value,
        college: document.getElementById("college").value,
        sessionType: document.getElementById("sessionType").value,
        duration: document.getElementById("duration").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };

    const response = await fetch("https://career-backend-9w86.onrender.com/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    document.getElementById("output").innerHTML =
        `<h3>✅ ${result.message}</h3>`;
});