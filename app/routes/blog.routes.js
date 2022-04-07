const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/blog.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/blog/all",[authJwt.verifyToken], controller.getAllBlogs);
  app.get("/api/blog/:id",[authJwt.verifyToken], controller.getSingleBlog);
  app.post('/api/blog',   [authJwt.verifyToken, authJwt.isAdmin], controller.createBlog);
  app.put('/api/blog/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateBlog);
  app.delete('/api/blog/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteBlog);
};