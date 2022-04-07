const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/athletediary.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/athlete/diary/all",[authJwt.verifyToken,authJwt.isAthlete], controller.getAllDiary);
  app.post('/api/athlete/diary',   [authJwt.verifyToken, authJwt.isAthlete], controller.createDiary);
  app.delete('/api/athlete/diary/:id', [authJwt.verifyToken, authJwt.isAthlete], controller.deleteDiary);
};