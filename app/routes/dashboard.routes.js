const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/dashboard.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get('/api/dashboard/pendingathletes', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllAthletes);
  app.get('/api/dashboard/getallpayments/:year?', controller.getAllPayments);
};