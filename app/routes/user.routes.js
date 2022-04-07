const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { verifySignUp } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/add-coach",
    [
      authJwt.verifyToken, 
      authJwt.isAdmin,
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.AddCoachUser
  );

  app.post(
    "/api/user/add-athlete",
    [
      authJwt.verifyToken, 
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.AddAthleteUser
  );

  app.get("/api/user/all/coach",[authJwt.verifyToken], controller.getAllCoaches);

  app.get("/api/user/all/athlete",[authJwt.verifyToken], controller.getAllAthletes);

  app.get("/api/user/coach/:id", [authJwt.verifyToken],controller.getCoachUser);
  
  app.get("/api/user/athlete/:id", [authJwt.verifyToken],controller.getAthleteUser);

  app.delete('/api/user/:userId',   [authJwt.verifyToken], controller.deleteUser);

  app.put('/api/user/update-coach/:userId', [authJwt.verifyToken], controller.updateCoachUser);

  app.put('/api/user/update-athlete/:userId', [authJwt.verifyToken], controller.updateAthleteUser);

  app.put('/api/user/update-user', [authJwt.verifyToken], controller.updateUserDetails);

  app.get("/api/user/get/subscription",[authJwt.verifyToken], controller.userSubscriptionDetails);
  app.get("/api/user/get/all",[authJwt.verifyToken], controller.getAllUsers);
};