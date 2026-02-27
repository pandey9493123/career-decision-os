const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔥 CONNECT TO MONGODB
mongoose.connect("mongodb+srv://careeradmin:<om9493739705>@cluster0.bb7jnd6.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// 📦 Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    college: String,
    sessionType: String,
    duration: String,
    date: String,
    time: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

// ✅ POST - Save Booking
app.post("/book", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.json({ message: "Booking successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving booking" });
    }
});

// ✅ GET - Get All Bookings
app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// 🚀 Render-Compatible Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});