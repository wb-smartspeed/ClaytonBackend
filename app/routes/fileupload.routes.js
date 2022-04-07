const controller = require("../controllers/fileupload.controller");
const checkIsValidExcelFormat = require("../middleware/fileupload");


module.exports = function(app) {
  app.post('/api/fileupload' ,[checkIsValidExcelFormat],controller.fileupload);
};