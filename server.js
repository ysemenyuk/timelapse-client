// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import path from 'path';

const { PORT, HOST } = process.env;
const MODE = process.env.NODE_ENV;

const app = express();

app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use('/*', (request, response) => {
  response.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`httpServer running in ${MODE} mode on port ${PORT}`);
});
