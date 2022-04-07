const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/programnew.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/new/program/all",[authJwt.verifyToken], controller.getAllPrograms);
  app.get("/api/new/program/:id",[authJwt.verifyToken], controller.getSingleProgram);
  app.post('/api/new/program',   [authJwt.verifyToken, authJwt.isAdmin], controller.createProgram);
  app.put('/api/new/program/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateProgram);
  app.delete('/api/new/program/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteProgram);
  app.get('/api/new/program/:id/title', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllProgramSubtitlesByAthlete);
};