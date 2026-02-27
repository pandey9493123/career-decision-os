const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔥 MongoDB connection
mongoose.connect("//career-backend-9w86.onrender.com/book")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Booking schema
const bookingSchema = new mongoose.Schema({
    name: String,
    college: String,
    sessionType: String,
    duration: String,
    date: String,
    time: String,
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// POST - Save booking
app.post("/book", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.json({ message: "Booking successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving booking" });
    }
});

// GET - all bookings
app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// Render-compatible port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));