const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/testimonial.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/testimonial/all",[authJwt.verifyToken], controller.getAllTestimonials);
  app.get("/api/testimonial/:id",[authJwt.verifyToken], controller.getSingleTestimonial);
  app.post('/api/testimonial',   [authJwt.verifyToken, authJwt.isAdmin], controller.createTestimonial);
  app.put('/api/testimonial/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateTestimonial);
  app.delete('/api/testimonial/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteTestimonial);
};