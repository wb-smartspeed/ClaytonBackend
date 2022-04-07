const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/homewebsite.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/website/home", controller.getHomePage);
  app.get("/api/website/coach/all", controller.getCoaches);
  app.get("/api/website/blog/all", controller.getAllBlogs);
  app.get("/api/website/testimonial/all", controller.getAllTestimonials);
  app.get("/api/website/pricing/all", controller.getAllPricings);
  app.get("/api/website/faq/all", controller.getAllFAQs);
  app.get("/api/website/blog/:id", controller.getSingleBlog);
  app.get("/api/website/coach/:id", controller.getCoachUser);
  app.get("/api/website/homesliderimage/all", controller.getAllHomeSliderImage);
  app.get("/api/website/metatags", controller.getSingleMetaTag);
  app.get("/api/website/social", controller.getSingleSocial);
  app.get("/api/website/logo", controller.getSingleLogo);
};
