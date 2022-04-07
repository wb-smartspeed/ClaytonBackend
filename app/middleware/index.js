const authJwt = require("./authjwt");
const verifySignUp = require("./verifysignup");
const verifyRole=require("./verifyrole");
const fileupload=require("./fileupload");
const checkDuplicates = require("./duplicate");


module.exports = {
  authJwt,
  verifySignUp,
  verifyRole,
  fileupload,
  checkDuplicates
};