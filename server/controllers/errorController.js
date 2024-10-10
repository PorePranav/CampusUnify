const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error!', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

// Handle CastError for invalid database IDs
const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

// Handle duplicate field values in MongoDB
const handleDuplicationErrorDB = (err) => {
  if (Object.keys(err.keyValue)[0] === 'email')
    return new AppError(`User with that email already exists`, 400);
  return new AppError(`${err.keyValue.name} already exists`, 400);
};

// Handle validation errors
const handleValidationErrorDB = (err) => {
  const errors = [];

  let passwordMinLengthErrorHandled = false;

  Object.values(err.errors).forEach((el) => {
    if (el.path === 'passwordConfirm' && !passwordMinLengthErrorHandled)
      errors.push('Passwords do not match.');
    else if (el.kind === 'minlength' && el.path === 'password') {
      errors.push(
        `The password should be at least ${el.properties.minlength} characters long.`,
      );
      passwordMinLengthErrorHandled = true;
    } else if (el.kind === 'required')
      errors.push(`The field ${el.path} is required.`);
    else errors.push(el.message);
  });

  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(message, 400);
};

// Handle invalid JWT token errors
const handleJWTError = () =>
  new AppError(`Invalid token. Please log in again!`, 401);

// Handle expired JWT token errors
const handleExpiredTokenError = () =>
  new AppError(`Token expired. Please log in again`, 401);

// Handle file size errors
const handleFileSizeError = () =>
  new AppError(`File size exceeds the allowable limit. Please upload a smaller file.`, 413);

// Handle unsupported file type errors
const handleUnsupportedFileTypeError = () =>
  new AppError(`Unsupported file format. Please upload a valid file type.`, 415);

// Handle syntax errors in JSON body
const handleSyntaxError = () =>
  new AppError(`Invalid JSON syntax. Please check your request body.`, 400);

// Handle document not found error for Mongoose
const handleDocumentNotFoundError = () =>
  new AppError(`The requested resource could not be found.`, 404);

// Handle rate limiting error
const handleRateLimitError = () =>
  new AppError(`Too many requests from this IP. Please try again later.`, 429);

module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res);
  } else {
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicationErrorDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleExpiredTokenError();

    // New error test cases
    if (err.code === 'LIMIT_FILE_SIZE') err = handleFileSizeError();
    if (err.code === 'UNSUPPORTED_FILE_TYPE') err = handleUnsupportedFileTypeError();
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) err = handleSyntaxError();
    if (err.name === 'DocumentNotFoundError') err = handleDocumentNotFoundError();
    if (err.name === 'RateLimitError') err = handleRateLimitError();

    sendErrorProd(err, res);
  }
};
