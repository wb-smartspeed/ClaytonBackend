const { authJwt,checkDuplicates } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/settingsocial.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.post('/api/social/setting',   [authJwt.verifyToken, authJwt.isAdmin], controller.createSocial);
  app.get('/api/social/setting', [authJwt.verifyToken, authJwt.isAdmin], controller.getSingleSocial);
};