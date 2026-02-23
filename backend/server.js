require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const urlDatabase = {};

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

app.get("/", (req, res) => {
  res.send("URL Shortener is running");
});

app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({
      error: "URL is required",
    });
  }

  const shortCode = generateShortCode();

  urlDatabase[shortCode] = longUrl;

  res.json({
    shortUrl: `http://localhost:5000/${shortCode}`,
  });
});

app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;

  const longUrl = urlDatabase[shortCode];

  if (longUrl) {
    return res.redirect(longUrl);
  }

  res.status(404).send("URL not found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
