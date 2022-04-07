const { authJwt,checkDuplicates } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/logo.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.post('/api/logo',   [authJwt.verifyToken, authJwt.isAdmin], controller.createLogo);
  app.get('/api/logo', [authJwt.verifyToken, authJwt.isAdmin], controller.getSingleLogo);
};