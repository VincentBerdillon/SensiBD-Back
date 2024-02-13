// services/s3Service.js
const AWS = require('aws-sdk');
const fs = require('fs');
const util = require('util');

const unlinkFile = util.promisify(fs.unlink);

// Récupère les informations de configuration d'AWS S3 depuis les variables d'environnement
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// Plus de débogage
if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  console.error('Une ou plusieurs variables d\'environnement AWS sont manquantes.');
}

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
  logger: console,
});

// Crée une nouvelle instance du client S3 avec les détails de configuration spécifiés
const s3 = new AWS.S3();

const uploadFileToS3 = async (file) => {
  // console.log(file);
  // Crée un flux de lecture à partir du fichier local, nécessaire pour l'envoi vers S3
  const fileStream = fs.createReadStream(file.path);
  // Le content-type est nécessaire pour afficher l'image dans le navigateur
  const contentType = file.mimetype;
  // La clé de l'objet S3 sera le nom du fichier téléversé
  const key = file.filename;

  /* Paramètres pour l'opération d'upload sur S3, incluant le nom du bucket,
  le corps du fichier et la clé sous laquelle le fichier sera enregistré */
  const uploadParams = {
    Bucket: bucketName,
    ContentType: contentType,
    Body: fileStream,
    Key: key,
  };
  // console.log(uploadParams);

  /* Déclenche l'opération d'upload vers S3 et retourne une
  promesse qui se résout une fois l'upload terminé */
  return s3.upload(uploadParams).promise()
    .then(() => {
      // Générer un lien présigné après le succès du téléversement
      const urlParams = {
        Bucket: bucketName,
        Key: key,
        // Expires: 60 * 5, // URL valide pour 5 minutes
      };
      return s3.getSignedUrlPromise('getObject', urlParams);
    })
    .then((signedUrl) => {
      console.log('Lien présigné:', signedUrl);
      return signedUrl; // Renvoie l'URL présignée
    })
    .catch((error) => {
      console.error('Erreur lors de la création du lien présigné:', error);
      throw error;
    });
};

const getFileStreamFromS3 = (fileKey) => {
  // Paramètres pour l'opération de téléchargement depuis S3
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  /* Récupère l'objet de S3 et crée un flux de lecture,
  ce qui permet de lire le contenu du fichier pour
  le transférer ou le traiter */
  s3.getObject(downloadParams).createReadStream();

  /* Récupère l'objet de S3 et crée un flux de lecture, ce qui permet
  de lire le contenu du fichier pour le transférer ou le traiter */
  return s3.getObject(downloadParams).createReadStream();
};

module.exports = { uploadFileToS3, getFileStreamFromS3, unlinkFile };
