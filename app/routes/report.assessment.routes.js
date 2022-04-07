const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/assessmentreport.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/assessment/report/sprints",[authJwt.verifyToken], controller.getAthletesAssesmentSprintById);
  app.get("/api/assessment/report/charts",[authJwt.verifyToken], controller.getAllAthleteAssessmentChartsById);
};