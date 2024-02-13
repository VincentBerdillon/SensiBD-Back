/* eslint-disable */
const sanitizer = require('sanitizer');

// passe en revue toutes les propriétés dans le corps d'une requête et la nettoie avec escape pour éviter les injections XSS
const bodySanitizer = (req, res, next) => {
    if (req.body) {
        for (const propName in req.body) {
            if (typeof req.body[propName] === 'string') {
                req.body[propName] = sanitizer.escape(req.body[propName]);
            }
        }
    }
    console.log(req.body);
    next();
};

module.exports = bodySanitizer;