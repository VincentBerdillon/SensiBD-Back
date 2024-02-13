/**
 * Fonction d'ordre supérieur pour les contrôleurs
 * @param {*} controller prends un contrôleur comme argument
 * @returns retourne une fonction asynchrone
 */
function controllerHandler(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = controllerHandler;
