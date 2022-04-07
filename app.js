const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require('./app/config/db.config');
const app = express();
const db = require("./app/models");
const upload=require("express-fileupload")
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'resource/files');
const RoleType = db.RoleType;
const ROLES =db.ROLES;
const User =db.User;

app.use(express.static(dirPath));


// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use(upload())


global.__basedir = dirPath;
// fs.mkdirSync(dirPath);
console.log("console==="+dirPath);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/fileupload.routes')(app);
require('./app/routes/sports.routes')(app);
require('./app/routes/assessment.routes')(app);
require('./app/routes/program.routes')(app);
require('./app/routes/faq.routes')(app);
require('./app/routes/blog.routes')(app);
require('./app/routes/testimonial.routes')(app);
require('./app/routes/videolibrary.model')(app);
require('./app/routes/home.routes')(app);
require('./app/routes/athlete.program.routes')(app);
require('./app/routes/athlete.videolibrary.routes')(app);
require('./app/routes/athlete.assessment.routes')(app);
require('./app/routes/athlete.diary.routes')(app);
require('./app/routes/website.home.routes')(app);
require('./app/routes/pricing.routes')(app);
require('./app/routes/dashboard.routes')(app);
require('./app/routes/homeimageslider.routes')(app);
require('./app/routes/report.assessment.routes')(app);
require('./app/routes/setting.metatag.routes')(app);
require('./app/routes/setting.social.routes')(app);
require('./app/routes/logo.routes')(app);
require('./app/routes/payment.routes')(app);
require('./app/routes/package.routes')(app);
require('./app/routes/subscription.routes')(app);
require('./app/routes/email.routes')(app);
require('./app/routes/chat.routes')(app);
require('./app/routes/programnew.routes')(app);

// simple route
app.get("/", (req, res) => {
   
    res.json({ message: "APIs is working." });
  });

// connect with mongo db

mongoose.Promise=global.Promise;
mongoose.connect(config.MONGO_URI,{
    useCreateIndex: true,
    useNewUrlParser: true
}).then(()=>{
    console.log("Db is connected")
    initial(function(){
      createDefaultUser();
    });
}).catch(err=>{
    console.log(err)
})


// set port, listen for requests

app.listen(config.PORT , () => {
  console.log(`Server is running on port: ${config.PORT }.`);
  console.log('--------------');

});

// initial
function initial(callback) {
    RoleType.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new RoleType({
          name: "Coach"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Coach' to roles collection");
        });
  
        new RoleType({
          name: "Athlete"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Athlete' to roles collection");
        });

        new RoleType({
          name: "Admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Admin' to roles collection");

          if(callback){
            callback();
          }
        });

      }
    });
    if(callback){
      callback();
    }
  }

  // initial
function createDefaultUser() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {


      RoleType.findOne({
        name: "Admin"
      }).exec((err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (role) {
         
      new User({
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345", 8),
        name:"Admin",
        role:role.id
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added admin to user collection");
      });
        }
      });
    }
  });
}

