const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Auth';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("MongoDB connection error", err);
  });
