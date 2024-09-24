const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './frontend/dist'))); 
app.use('/api/v1/transaction', require("./routes/transactionRoutes"));
app.use('/api/v1/users', require("./routes/userRoute"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
