const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/payment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/payment/create",
    controller.createSubscription
  );

  app.get('/api/payments', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllPayments);

};
