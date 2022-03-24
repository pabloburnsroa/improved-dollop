const express = require('express');
require('dotenv').config({ path: './config/.env' });

const envelopesRouter = require('./routes/envelopes');
const apiDocsRouter = require('./routes/apiDocs');

const app = express();
app.use(express.json());
app.use('/api-docs', apiDocsRouter);
app.use('/api/v1/envelopes/', envelopesRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
