const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/home.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/home/banner/get",[authJwt.verifyToken], controller.getSingleBanner);
  app.post('/api/home/banner',   [authJwt.verifyToken, authJwt.isAdmin], controller.createBanner);
  app.put('/api/home/banner/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateBanner);

  app.get("/api/home/about/get",[authJwt.verifyToken], controller.getSingleAbout);
  app.post('/api/home/about',   [authJwt.verifyToken, authJwt.isAdmin], controller.createAbout);
  app.put('/api/home/about/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateAbout);

  app.get("/api/home/offer/get",[authJwt.verifyToken], controller.getSingleOffer);
  app.post('/api/home/offer',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOffer);
  app.put('/api/home/offer/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOffer);

  app.get("/api/home/offer/image1/get",[authJwt.verifyToken], controller.getSingleOfferImage1);
  app.post('/api/home/offer/image1',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage1);
  app.put('/api/home/offer/image1/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage1);


  app.get("/api/home/offer/image2/get",[authJwt.verifyToken], controller.getSingleOfferImage2);
  app.post('/api/home/offer/image2',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage2);
  app.put('/api/home/offer/image2/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage2);

  app.get("/api/home/offer/image3/get",[authJwt.verifyToken], controller.getSingleOfferImage3);
  app.post('/api/home/offer/image3',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage3);
  app.put('/api/home/offer/image3/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage3);

  
  app.get("/api/home/offer/image4/get",[authJwt.verifyToken], controller.getSingleOfferImage4);
  app.post('/api/home/offer/image4',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage4);
  app.put('/api/home/offer/image4/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage4);

  app.get("/api/home/offer/image5/get",[authJwt.verifyToken], controller.getSingleOfferImage5);
  app.post('/api/home/offer/image5',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage5);
  app.put('/api/home/offer/image5/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage5);

  app.get("/api/home/offer/image6/get",[authJwt.verifyToken], controller.getSingleOfferImage6);
  app.post('/api/home/offer/image6',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage6);
  app.put('/api/home/offer/image6/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage6);

  app.get("/api/home/offer/image7/get",[authJwt.verifyToken], controller.getSingleOfferImage7);
  app.post('/api/home/offer/image7',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage7);
  app.put('/api/home/offer/image7/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage7);

  app.get("/api/home/offer/image8/get",[authJwt.verifyToken], controller.getSingleOfferImage8);
  app.post('/api/home/offer/image8',   [authJwt.verifyToken, authJwt.isAdmin], controller.createOfferImage8);
  app.put('/api/home/offer/image8/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateOfferImage8);

  app.get("/api/home/makesdifferent/get",[authJwt.verifyToken], controller.getSingleMakesDifferent);
  app.post('/api/home/makesdifferent',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMakesDifferent);

  app.get("/api/home/makesdifferent/image/get",[authJwt.verifyToken], controller.getSingleMakesDifferentImage);
  app.post('/api/home/makesdifferent/image',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMakesDifferentImage);

  app.get("/api/home/makesdifferent1/get",[authJwt.verifyToken], controller.getSingleMakesDifferent1);
  app.post('/api/home/makesdifferent1',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMakesDifferent1);

  app.get("/api/home/makesdifferent2/get",[authJwt.verifyToken], controller.getSingleMakesDifferent2);
  app.post('/api/home/makesdifferent2',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMakesDifferent2);

  app.get("/api/home/makesdifferent3/get",[authJwt.verifyToken], controller.getSingleMakesDifferent3);
  app.post('/api/home/makesdifferent3',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMakesDifferent3);

  app.get("/api/home/makesdifferent4/get",[authJwt.verifyToken], controller.getSingleMakesDifferent4);
  app.post('/api/home/makesdifferent4',   [authJwt.verifyToken, authJwt.isAdmin], controller.createMakesDifferent4);

  app.get("/api/home/slider/get",[authJwt.verifyToken], controller.getHomeSlider);
  app.post('/api/home/slider',   [authJwt.verifyToken, authJwt.isAdmin], controller.createHomeSlider);
  app.delete('/api/home/slider/:id',   [authJwt.verifyToken, authJwt.isAdmin], controller.deleteHomeSlider);

  app.get("/api/home/timeline1/get",[authJwt.verifyToken], controller.getSingleTimeline1);
  app.post('/api/home/timeline1',   [authJwt.verifyToken, authJwt.isAdmin], controller.createTimeline1);

  app.get("/api/home/timeline2/get",[authJwt.verifyToken], controller.getSingleTimeline2);
  app.post('/api/home/timeline2',   [authJwt.verifyToken, authJwt.isAdmin], controller.createTimeline2);

  app.get("/api/home/timeline3/get",[authJwt.verifyToken], controller.getSingleTimeline3);
  app.post('/api/home/timeline3',   [authJwt.verifyToken, authJwt.isAdmin], controller.createTimeline3);

  app.get("/api/home/timeline4/get",[authJwt.verifyToken], controller.getSingleTimeline4);
  app.post('/api/home/timeline4',   [authJwt.verifyToken, authJwt.isAdmin], controller.createTimeline4);
};