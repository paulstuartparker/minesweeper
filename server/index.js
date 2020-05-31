const express = require('express');

const app = express();

const SERVER_PORT = 8080;

const game = require('./routes/game');

app.use(express.static('dist'));
app.use(express.static('public'));

app.use('/game', game);

app.listen(SERVER_PORT, () => console.log(`Node server listening on port ${SERVER_PORT}!`));
