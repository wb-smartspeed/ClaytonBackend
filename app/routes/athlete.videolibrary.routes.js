const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/athletevideolibrary.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/athlete/videolibrary/all",[authJwt.verifyToken,authJwt.isAthlete], controller.getAthleteAllVideoLibraryByUser);
  app.post('/api/athlete/videolibrary',   [authJwt.verifyToken,authJwt.isAthlete], controller.createAthleteVideoLibrary);
  app.get("/api/athlete/videolibrary/:id",[authJwt.verifyToken,authJwt.isAthlete], controller.getAthleteSingleVideoLibrary);
  app.put('/api/athlete/videolibrary/:id', [authJwt.verifyToken,authJwt.isAthlete], controller.updateAthleteVideoLibrary);
  app.delete('/api/athlete/videolibrary/:id', [authJwt.verifyToken,authJwt.isAthlete], controller.deleteAthleteVideoLibrary);
};