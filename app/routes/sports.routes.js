const { authJwt,checkDuplicates } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/sports.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/sports/all", controller.getAllSports);
  app.post('/api/sports',   [authJwt.verifyToken, authJwt.isAdmin,checkDuplicates.checkSportsExists], controller.createSports);
  app.put('/api/sports/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateSports);
  app.delete('/api/sports/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteSports);
};