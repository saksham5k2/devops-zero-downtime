const express = require("express");
const app = express();

const VERSION = process.env.VERSION || "v1";

app.get("/", (req, res) => {
  res.send(`Hello from ${VERSION}`);
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/fail", (req, res) => {
  process.exit(1);
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});