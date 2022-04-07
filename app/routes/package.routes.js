const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/package.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      app.get("/api/package/all",[authJwt.verifyToken], controller.getAllPackage);
      app.get("/api/package/:id",[authJwt.verifyToken], controller.getSinglePackage);
      app.post('/api/package',[authJwt.verifyToken], controller.createPackage);
      app.put('/api/package/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updatePackage);
      app.delete('/api/package/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deletePackage);
      app.post('/api/package/activate',[authJwt.verifyToken], controller.activatePlan);
      app.post('/api/package/deactivate',[authJwt.verifyToken], controller.deactivatePlan);

};