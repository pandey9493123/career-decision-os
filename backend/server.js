const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let bookings = [];

app.post("/book", (req, res) => {
    const data = req.body;
    bookings.push(data);
    res.json({ message: "Booking successful!", data });
});

app.get("/bookings", (req, res) => {
    res.json(bookings);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});