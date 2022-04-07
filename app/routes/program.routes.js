const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/program.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/program/all",[authJwt.verifyToken], controller.getAllPrograms);
  app.get("/api/program/:id",[authJwt.verifyToken], controller.getSingleProgram);
  app.post('/api/program',   [authJwt.verifyToken, authJwt.isAdmin], controller.createProgram);
  app.put('/api/program/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateProgram);
  app.delete('/api/program/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteProgram);
};