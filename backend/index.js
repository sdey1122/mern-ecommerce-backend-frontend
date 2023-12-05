require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConfigureDB = require('./config/DB');
const route = require('./config/route');

const port = 4040;
const app = express();

app.use(express.json());
app.use(cors());

// Assuming ConfigureDB is an async function, so using async/await bruh...
const startServer = async () => {
  try {
    await ConfigureDB();
    app.use('/', route);

    app.listen(port, () => {
      console.log(`Alrighty! Server is running on port, ${port}.. IT'S SHOW TIME!`);
    });
  } catch (error) {
    console.error(`OOPS! What'd you do to the database bruh:, ${error}`);
  }
};

startServer();