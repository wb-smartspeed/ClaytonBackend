const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/role.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/role/all",[authJwt.verifyToken], controller.getAllRoles);
  app.post('/api/role',   [authJwt.verifyToken, authJwt.isAdmin,checkRole], controller.createRole);
  app.put('/api/role/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateRole);
  app.get('/api/role/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.getSingleRole);
  app.delete('/api/role/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteRole);
};