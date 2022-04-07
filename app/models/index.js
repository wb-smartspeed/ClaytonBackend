const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user.model");
db.RoleType = require("./role.model");
db.SportsType = require("./sports.model");
db.AthleteCoachMapping = require("./athletecoachmapping.model");
db.Logo = require("./logo.model");
db.Assessment = require("./assessment.model");
db.Program = require("./program.model");
db.ProgramNew = require("./programnew.model");
db.FAQ = require("./faq.model");
db.Testimonial = require("./testimonial.model");
db.Blog = require("./blog.model");
db.VideoLibrary = require("./videolibrary.model");
db.HomeBanner = require("./homebanner.model");
db.HomeAbout = require("./homeabout.model");
db.HomeOffer = require("./homeoffer.model");
db.HomeOfferImage1 = require("./homeoffer.image1.model");
db.HomeOfferImage2 = require("./homeoffer.image2.model");
db.HomeOfferImage3 = require("./homeoffer.image3.model");
db.HomeOfferImage4 = require("./homeoffer.image4.model");
db.HomeOfferImage5 = require("./homeoffer.image5.model");
db.HomeOfferImage6 = require("./homeoffer.image6.model");
db.HomeOfferImage7 = require("./homeoffer.image7.model");
db.HomeOfferImage8 = require("./homeoffer.image8.model");
db.HomeMakesDifferent = require("./homemakesdifferent.model");
db.HomeMakesDifferent1 = require("./homemakesdifferent1.model");
db.HomeMakesDifferent2 = require("./homemakesdifferent2.model");
db.HomeMakesDifferent3 = require("./homemakesdifferent3.model");
db.HomeMakesDifferent4 = require("./homemakesdifferent4.model");
db.HomeMakesDifferentImage = require("./HomeMakesDifferentImage.model");
db.HomeSlider = require("./homeslider.model");
db.HomeTimeline1 = require("./hometimeline1.model");
db.HomeTimeline2 = require("./hometimeline2.model");
db.HomeTimeline3 = require("./hometimeline3.model");
db.HomeTimeline4 = require("./hometimeline4.model");
db.AthleteAssessment = require("./athleteassessment.model");
db.Diary = require("./diary.model");
db.Pricing = require("./pricing.model");
db.HomeSliderImage = require("./homesliderimage.model");
db.Email = require("./email.model");
db.EmailUser = require("./emailuser.model");
db.SettingMetaTag = require("./settingmeta.model");
db.SettingSocial = require("./settingsocial.model");
db.PaymentSubscription = require("./paymentsubscription.model");
db.ChatUser = require("./chatuser.model");
db.ChatMessage = require("./chatmessage.model");
db.ProgramInstruction=require("./programinstruction.model");

db.ROLES = ["Coach", "Athlete","Admin"];

module.exports = db;