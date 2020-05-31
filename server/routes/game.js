const express = require('express');

const router = express.Router();

const { gameController } = require('../controllers/game_controller');

router.get('/', (req, res) => {
  const response = gameController.getGame(req.query);
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(response.status).send(response.data);
});

module.exports = router;
