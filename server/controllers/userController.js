const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const userHandlerFactory = require('./userHandlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });

  return newObject;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    next(new AppError(`Can't update password using this route`, 400));
  const filteredBody = filterObj(req.body, 'name', 'email', 'avatar');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = userHandlerFactory.getAll(User);
exports.getUser = userHandlerFactory.getOne(User);
exports.updateUser = userHandlerFactory.updateOne(User);
exports.deleteUser = userHandlerFactory.deleteOne(User);
