const fs = require('fs')

function test(req,res,next) {
  console.log('masuk bambang');
  if(req.body){
    console.log('///BODY');
    console.log(req.body);
  }
  if(req.file){
    console.log('///file');
    console.log(req.file);
  }
  if(req.files){
    console.log('///files');
    console.log(req.files);
  }
  next()
}

module.exports = test