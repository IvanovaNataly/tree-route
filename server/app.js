const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('You are on the base');
});

app.get('/users', (req, res) => {
  res.send(JSON.stringify([1, 2, 3]));
});

app.listen('3000', () => console.log('listening...'));

