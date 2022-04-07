const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/assessment.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/assessment/all",[authJwt.verifyToken], controller.getAllAssessments);
  app.get("/api/assessment/:id",[authJwt.verifyToken], controller.getSingleAssessment);
  app.post('/api/assessment',   [authJwt.verifyToken, authJwt.isAdmin], controller.createAssessment);
  app.put('/api/assessment/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateAssessment);
  app.delete('/api/assessment/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAssessment);
  app.get("/api/assessment/athlete/all/:id",[authJwt.verifyToken], controller.getAllAssessmentsByAthlete);
  app.get("/api/assessment/athlete/:id",[authJwt.verifyToken], controller.getAllAthleteAssessments);
};