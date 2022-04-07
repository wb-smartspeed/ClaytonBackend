const fs=require("fs");
const db = require("../models");
const Player = db.player;
var uuid = require('uuid');
var path = require('path');

exports.fileupload= async (req, res) => {
const file=req.files.file
if(file){
    const extname=path.extname(file.name);
    let newfilename=uuid.v1()+""+extname
    let filepath=__basedir+"/"+newfilename;
    file.mv(filepath,function(err,result){
      if(err){
        res.send({message:err});
      }
      res.send({
        status:true,
        message:"file uploaded!",
        data:{
            filepath:filepath,
            oldfilename:file.name,
            newfilename:newfilename,
        }
      });
    });
}
else{
    res.send({
        status:false,
        message:"please select file"
      });
}
};
