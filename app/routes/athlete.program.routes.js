const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/athleteprogram.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.put("/api/athlete/program/update/:id?",[authJwt.verifyToken], controller.updateProgram);
  app.get("/api/athlete/program/all/:id?",[authJwt.verifyToken], controller.getAllProgramsByUser);
  app.get("/api/athlete/program/title/:id",[authJwt.verifyToken], controller.getAllProgramSubtitlesByProgram);
};