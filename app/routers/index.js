// Importation du module debug
const express = require('express');
// Importation du postRouter
const postRouter = require('./post');
const userRouter = require('./user');
const categoryRouter = require('./category');
const audienceRouter = require('./audience');
const conditionRouter = require('./condition');
const messageRouter = require('./message');
const imageRouter = require('./image');

// Création du router
const router = express.Router();

// Définition des routes
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/audiences', audienceRouter);
router.use('/conditions', conditionRouter);
router.use('/messages', messageRouter);
router.use('/images', imageRouter);

// Exportation du router
module.exports = router;
