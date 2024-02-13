// controllers/fileController.js
const {
  uploadFileToS3,
  getFileStreamFromS3,
  unlinkFile,
} = require('../utils/s3Service');

const uploadFile = async (req, res) => {
  const result = await uploadFileToS3(req.file);
  await unlinkFile(req.file.path);
  res.send({
    imagePath: result,
  });
};

const getFile = (req, res) => {
  const readStream = getFileStreamFromS3(req.params.key);
  readStream.pipe(res);
};

module.exports = {
  uploadFile,
  getFile,
};