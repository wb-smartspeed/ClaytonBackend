const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/faq.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/faq/all",[authJwt.verifyToken], controller.getAllFAQs);
  app.get("/api/faq/:id",[authJwt.verifyToken], controller.getSingleFAQ);
  app.post('/api/faq',   [authJwt.verifyToken, authJwt.isAdmin], controller.createFAQ);
  app.put('/api/faq/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateFAQ);
  app.delete('/api/faq/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteFAQ);
};