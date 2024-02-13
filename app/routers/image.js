// routers/imageRouter.js
const express = require('express');
const {
    uploadFile,
    getFile,
} = require('../controllers/file');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('image'), uploadFile);
// router.get('/:key', getFile);

module.exports = router;