<<<<<<< HEAD
const AppError = require('./../utils/appError');
=======
const AppError = require("./../utils/appError");
>>>>>>> b4fdd8b (sync commit)

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
<<<<<<< HEAD
    console.error('Error!', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
=======
    console.error("Error!", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
>>>>>>> b4fdd8b (sync commit)
    });
  }
};

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicationErrorDB = (err) => {
<<<<<<< HEAD
  if (Object.keys(err.keyValue)[0] === 'email')
=======
  if (Object.keys(err.keyValue)[0] === "email")
>>>>>>> b4fdd8b (sync commit)
    return new AppError(`User with that email already exists`, 400);
  return new AppError(`${err.keyValue.name} already exists`, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
<<<<<<< HEAD
  const message = `Invalid input data. ${errors.join('. ')}`;
=======
  const message = `Invalid input data. ${errors.join(". ")}`;
>>>>>>> b4fdd8b (sync commit)
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(`Invalid token. Please log in again!`, 401);

const handleExpiredTokenError = () =>
  new AppError(`Token expired. Please log in again`, 401);

module.exports = (err, req, res, next) => {
  err.statusCode ||= 500;
<<<<<<< HEAD
  err.status ||= 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else {
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicationErrorDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleExpiredTokenError();
=======
  err.status ||= "error";

  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
  else {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicationErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleExpiredTokenError();
>>>>>>> b4fdd8b (sync commit)
    sendErrorProd(err, res);
  }
};
