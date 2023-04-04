// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || 'development';

const app = express();

app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use('/*', (request, response) => {
  response.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(9090, '192.168.1.43', () => {
  console.log(`httpServer running in ${MODE} mode on port ${PORT}`);
});
