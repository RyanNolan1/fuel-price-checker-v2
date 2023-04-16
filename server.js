const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;

const api_key = process.env.API_KEY;


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/api_key', (req, res) => {
  res.send({ API_KEY: api_key });
});


