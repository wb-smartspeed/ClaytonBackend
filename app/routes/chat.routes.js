const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/chat.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.post("/api/chat/send",[authJwt.verifyToken], controller.sendChat);
  app.get("/api/chat/user/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.getAllChatByUser);
  app.get("/api/chat/self",[authJwt.verifyToken], controller.getSelfChat);
  app.get("/api/chat/users",[authJwt.verifyToken, authJwt.isAdmin], controller.getAllUserChat);
  app.post("/api/chat/:id/markread",[authJwt.verifyToken, authJwt.isAdmin], controller.updateIsRead);
  app.post("/api/chat/:id/clearchats",[authJwt.verifyToken], controller.deleteChats);
};