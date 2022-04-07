const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/email.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.post("/api/email/send", controller.sendEmail);
  app.post("/api/email/reply",[authJwt.verifyToken, authJwt.isAdmin], controller.sendReplyEmail);
  app.get("/api/email/users",[authJwt.verifyToken, authJwt.isAdmin], controller.getAllUserEmail);
  app.get("/api/email/user/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.getAllEmailsByUser);
  app.post("/api/email/:id/markread",[authJwt.verifyToken, authJwt.isAdmin], controller.updateIsRead);
  app.post("/api/email/:id/clearemails",[authJwt.verifyToken], controller.deleteEmail);
};