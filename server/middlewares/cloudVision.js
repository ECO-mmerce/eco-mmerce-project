async function detectIngredients(req, res, next) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  // Creates a client
  console.log(req.files, `INI DI CLOUDVISION`);
  const anotate = new vision.ImageAnnotatorClient();

  try {
    // Performs text detection on the image file

    if (req.files) {
      const [result] = await anotate.textDetection(
        req.files.ingredients[0].buffer
      );
      const texts = result.textAnnotations;
      let isFound = false;
      let output = '';

      texts.forEach((text, i) => {
        if (i !== 0) {
          if (
            text.description.toLowerCase().includes('ingredient') ||
            text.description.toLowerCase().includes('ingredients') ||
            text.description.toLowerCase().includes('composition') ||
            text.description.toLowerCase().includes('compositions') ||
            text.description.toLowerCase().includes('komposisi')
          ) {
            isFound = true;
          }

          if (isFound === true) {
            output += text.description + ' ';
            if (text.description.includes('.')) {
              isFound = false;
            }
          }
        }
      });

      if(output.length === 0){
        let err = new Error()
        err.name = 'Bad Request'
        err.message = `Uploaded picture didn't contain ingridients`
        next(err)
      }else {
        output = output.toLowerCase().split(', ')
        output[0] = output[0].split(' ').slice(1).join(' ');
        req.body.ingridient = output
        next()
      }
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = detectIngredients;
