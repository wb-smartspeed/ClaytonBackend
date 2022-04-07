var path = require('path');

isValidExcelFormat = (req, res, next) => {

if(req.files==null){
    res.send({
        status:false,
        message:"please select file."
      });
}
    const file=req.files.file;

    if(file!=null){
        const extname=path.extname(file.name);
        next();
    }
    else{
        res.send({
            status:false,
            message:"please select file."
          });
    }
  };

module.exports = isValidExcelFormat;