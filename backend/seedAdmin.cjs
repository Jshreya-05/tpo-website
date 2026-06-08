const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// connect DB
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tpo_kbp";
mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected for seeding..."))
    .catch(err => console.log(err));

// user schema (simple but must match required fields)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
});

const User = mongoose.model("User", userSchema);

async function seedAdmin() {
    try {
        const existing = await User.findOne({ email: "admin@kbp.edu" });

        if (existing) {
            console.log("Admin already exists. Purging and recreating...");
            await User.deleteOne({ email: "admin@kbp.edu" });
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await User.create({
            name: "Head of TPO",
            email: "admin@kbp.edu",
            password: hashedPassword,
            role: "admin",
        });

        console.log("✅ Admin created successfully (admin@kbp.edu / admin123)");
    } catch (err) {
        console.error("Seeding failed:", err.message);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

seedAdmin();
