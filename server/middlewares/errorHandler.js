const serverErr = {
  message: 'Internal server error',
};

function errorHandler(err, req, res, next) {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }

  switch (err.name) {
    case 'Not Found':
      res.status(404).json({ message: err.message });
      break;
    case 'Bad Request':
      res.status(400).json({ message: err.message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message: err.message });
      break;
    case 'Forbidden':
      res.status(403).json({ message: err.message });
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: 'Email already exists' });
      break;
    case 'SequelizeValidationError':
      const errResponse = err.errors.map((error) => {
        return {
          message: error.message,
        };
      });

      res.status(400).json(errResponse);
      break;
    default:
      res.status(500).json(serverErr);
      break;
  }
}

module.exports = errorHandler;
