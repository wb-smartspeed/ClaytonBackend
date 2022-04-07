const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/videolibrary.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/videolibrary/all",[authJwt.verifyToken], controller.getAllVideoLibrarys);
  app.get("/api/videolibrary/:id",[authJwt.verifyToken], controller.getSingleVideoLibrary);
  app.post('/api/videolibrary',   [authJwt.verifyToken], controller.createVideoLibrary);
  app.put('/api/videolibrary/:id', [authJwt.verifyToken], controller.updateVideoLibrary);
  app.delete('/api/videolibrary/:id', [authJwt.verifyToken], controller.deleteVideoLibrary);
};