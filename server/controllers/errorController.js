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

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicationErrorDB = (err) => {
  if (Object.keys(err.keyValue)[0] === 'email')
    return new AppError(`User with that email already exists`, 400);
  return new AppError(`${err.keyValue.name} already exists`, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = [];

  let passwordMinLengthErrorHandled = false;

  Object.values(err.errors).forEach((el) => {
    if (el.kind === 'minlength' && el.path === 'password') {
      errors.push(
        `The password should be at least ${el.properties.minlength} characters long.`
      );
      passwordMinLengthErrorHandled = true;
    } else if (el.path === 'passwordConfirm' && !passwordMinLengthErrorHandled)
      errors.push('Passwords do not match.');
    else if (el.kind === 'required')
      errors.push(`The field ${el.path} is required.`);
    else errors.push(el.message);
  });

  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(`Invalid token. Please log in again!`, 401);

const handleExpiredTokenError = () =>
  new AppError(`Token expired. Please log in again`, 401);

module.exports = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else {
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicationErrorDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleExpiredTokenError();

    sendErrorProd(err, res);
  }
};
