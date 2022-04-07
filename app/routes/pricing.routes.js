const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/pricing.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/pricing/all",[authJwt.verifyToken], controller.getAllPricings);
  app.get("/api/pricing/:id",[authJwt.verifyToken], controller.getSinglePricing);
  app.post('/api/pricing', controller.createPricing);
  app.put('/api/pricing/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updatePricing);
  app.delete('/api/pricing/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deletePricing);
};