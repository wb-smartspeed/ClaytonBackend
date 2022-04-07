const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/homeimageslider.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/homeimageslider/all", controller.getAllHomeSliderImages);
  app.get("/api/homeimageslider/:id",[authJwt.verifyToken], controller.getSingleHomeSliderImage);
  app.post('/api/homeimageslider',   [authJwt.verifyToken, authJwt.isAdmin], controller.createHomeSliderImage);
  app.put('/api/homeimageslider/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateHomeSliderImage);
  app.delete('/api/homeimageslider/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteHomeSliderImage);
};