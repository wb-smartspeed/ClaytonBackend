const { authJwt,checkDuplicates } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/settingmeta.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.post('/api/metatag/setting',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMetaTag);
  app.get('/api/metatag/setting', [authJwt.verifyToken, authJwt.isAdmin], controller.getSingleMetaTag);
};