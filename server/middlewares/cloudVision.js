async function detectIngredients(req,res,next) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const anotate = new vision.ImageAnnotatorClient();

  try {
    // Performs text detection on the image file

    if(req.files){
      const [result] = await anotate.textDetection(req.files.ingredients[0].buffer);
      const texts = result.textAnnotations;
      let found = false
      let output = ''
    
      texts.forEach((text, i) => {
        if(i !== 0){
          if(text.description.toLowerCase().includes('ingredients') || text.description.toLowerCase().includes('komposisi') || text.description.toLowerCase().includes('composition')){
            found = true
          }
          if(found === true) {
            output += text.description + ' '
            if(text.description.includes('.')){
              found = false
            }
          }
        }
      })
      output = output.toLowerCase().split(', ')
      req.body.ingridient = output
      next()

    }
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = detectIngredients