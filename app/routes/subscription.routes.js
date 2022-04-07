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
    "/api/subscription/create",
    controller.createSubscription
  );

  app.get('/api/subscription/all', [authJwt.verifyToken], controller.getAllPayments);
  app.get('/api/subscription/transaction/detail/:id', [authJwt.verifyToken], controller.getSinglePaymentDetails);
  app.get('/api/subscription/transaction/all', [authJwt.verifyToken], controller.getAllPaymentDetails);
  app.post('/api/subscription/transaction/cancel', [authJwt.verifyToken], controller.cancelSubscription);
  app.post('/api/subscription/:id/suspend', [authJwt.verifyToken], controller.suspendSubscription);
  app.post('/api/subscription/:id/activate', [authJwt.verifyToken], controller.activateSubscription);
};
