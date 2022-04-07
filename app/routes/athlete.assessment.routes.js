const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/athleteassessment.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/athlete/assessment/all",[authJwt.verifyToken, authJwt.isAthlete], controller.getAllAssessmentsByUser);
  app.get("/api/athlete/assessment/sprints/:id",[authJwt.verifyToken, authJwt.isAthlete], controller.getAthletesAssesmentSprint);
  app.post('/api/athlete/assessment/add',   [authJwt.verifyToken], controller.addAthleteAssessment);
  app.get("/api/athlete/assessment/charts/:id",[authJwt.verifyToken, authJwt.isAthlete], controller.getAllAthleteAssessmentCharts);
};