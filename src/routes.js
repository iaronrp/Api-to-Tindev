const express = require('express');
const DevController = require('./controller/dev');
const LikeController = require('./controller/likeController');
const Dislikes = require('./controller/dislikes');

const routes = express.Router();


routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', Dislikes.store);

module.exports = routes;