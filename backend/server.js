const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transaction'));

const path = require("path");

app.use(express.static(path.resolve(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});