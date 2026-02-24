import dotenv from "dotenv";
dotenv.config();

import express from "express";

import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(express.json());

app.use("/", urlRoutes);

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
