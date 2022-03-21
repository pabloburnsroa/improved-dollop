const express = require('express');
require('dotenv').config({ path: './config/.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
