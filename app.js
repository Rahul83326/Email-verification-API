const express = require('express');
const authRoutes = require("./authentication/authentication.route");
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get('/healthCheck', (req, res) => {
  res.send("Hello");
});

module.exports = app;