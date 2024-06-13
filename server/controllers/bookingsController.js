const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Bookings = require('./../models/bookingsModel');
const Event = require('./../models/eventModel');
const Order = require('./../models/orderModel');
const Registrations = require('./../models/registrationModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

exports.addBooking = catchAsync(async (req, res, next) => {
  const fetchedOrder = await Order.findById(req.payment.orderId);
  const eventIds = fetchedOrder.orderItems;

  for (const eventId of eventIds) {
    const fetchedBookings = await Bookings.findOne({ eventId });
    const newRegisteredUser = {
      userId: req.payment.userId,
      paymentId: req.payment._id,
    };
    fetchedBookings.registeredUsers.push(newRegisteredUser);
    await fetchedBookings.save();

    await Registrations.create({
      userId: req.payment.userId,
      eventId,
      paymentId: req.payment._id,
    });
  }

  res.status(200).json({
    status: 'success',
    data: eventIds,
  });
});

exports.getEventBookings = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with the given ${req.params.eventId} exists`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const fetchedBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  }).populate('registeredUsers.userId registeredUsers.paymentId');

  res.status(200).json({
    status: 'success',
    results: fetchedBookings.registeredUsers.length,
    data: { registeredUsers: fetchedBookings.registeredUsers },
  });
});

exports.getUserRegistrations = catchAsync(async (req, res, next) => {
  const userRegistrations = await Registrations.find({
    userId: req.user.id,
  }).populate('eventId paymentId');

  res.status(200).json({
    status: 'success',
    results: userRegistrations.length,
    data: userRegistrations,
  });
});

exports.deleteEventBooking = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with the given ${req.params.eventId} exists`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const fetchedBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  }).populate('registeredUsers.userId registeredUsers.paymentId');

  const newBookings = fetchedBookings.registeredUsers.filter(
    (booking) => booking._id.toString() !== req.params.bookingId
  );

  fetchedBookings.registeredUsers = newBookings;

  await fetchedBookings.save();

  res.status(200).json({
    status: 'success',
    data: fetchedBookings,
  });
});

exports.getSingleEventDetails = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with the given ${req.params.eventId} exists`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const fetchedBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  }).populate('registeredUsers.userId registeredUsers.paymentId');

  const searchedBooking = fetchedBookings.registeredUsers.find(
    (booking) => booking._id.toString() === req.params.bookingId
  );

  if (!searchedBooking) {
    return next(
      new AppError(`There is no booking with ${req.params.bookingId}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: searchedBooking,
  });
});

exports.generateTicket = catchAsync(async (req, res, next) => {
  const fetchedRegistration = await Registrations.findById(
    req.params.id
  ).populate('userId eventId paymentId');

  if (!fetchedRegistration) {
    return next(new AppError(`No ticket with id ${req.params.id} exists`, 404));
  }

  if (req.user.id.toString() !== fetchedRegistration.userId._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const qrCodePath = await generateQrCode(fetchedRegistration);
  const pdfPath = await createTicketPDF(fetchedRegistration, qrCodePath);

  res.setHeader('Content-Length', pdfPath.length);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');
  res.download(pdfPath, 'event-ticket.pdf', (err) => {
    if (err) {
      return next(new AppError('Error sending file', 500));
    }

    fs.unlink(pdfPath, (err) => {
      if (err) console.error(`Error deleting PDF file: ${pdfPath}`, err);
    });

    fs.unlink(qrCodePath, (err) => {
      if (err) console.error(`Error deleting QR code file: ${qrCodePath}`, err);
    });
  });
});

const createTicketPDF = async (registration, qrCodePath) => {
  const { userId, eventId, paymentId } = registration;

  const pdfPath = path.join(
    __dirname,
    `ticket-${eventId._id}-${userId._id}.pdf`
  );

  const drawBorder = (doc) => {
    doc
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .strokeColor('#000')
      .lineWidth(2)
      .stroke();
  };

  const doc = new PDFDocument();

  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  drawBorder(doc);
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#e8e8e8');
  doc
    .fontSize(25)
    .font('Helvetica-Bold')
    .fillColor('#333')
    .text('Event Ticket', { align: 'center' });
  doc.moveDown(1);
  doc
    .fontSize(15)
    .font('Helvetica-Bold')
    .fillColor('#333')
    .text('Event Details:', { underline: true });
  doc
    .fontSize(15)
    .font('Helvetica')
    .fillColor('#000')
    .text(`Event: ${eventId.name}`)
    .text(`Date: ${new Date(eventId.date).toLocaleDateString()}`)
    .moveDown();
  doc
    .fontSize(15)
    .font('Helvetica-Bold')
    .fillColor('#333')
    .text('Ticket Information:', { underline: true });
  doc
    .fontSize(15)
    .font('Helvetica')
    .fillColor('#000')
    .text(`Ticket ID: ${paymentId.internalPaymentId}`)
    .text(`Attendee: ${userId.name}`)
    .moveDown(1);

  doc.image(qrCodePath, { fit: [100, 100], align: 'center', valign: 'center' });

  doc.moveDown(10);
  doc
    .moveTo(20, doc.y)
    .lineTo(doc.page.width - 20, doc.y)
    .strokeColor('#333')
    .lineWidth(1)
    .stroke();

  doc.moveDown(1);
  doc
    .fontSize(10)
    .font('Helvetica-Oblique')
    .fillColor('#333')
    .text('Thank you for your purchase. Enjoy the event!', { align: 'center' });
  doc.moveDown(0.5);
  doc
    .fontSize(8)
    .fillColor('#666')
    .text('For more information, visit our website or contact support.', {
      align: 'center',
    });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(pdfPath));
    writeStream.on('error', reject);
  });
};

const generateQrCode = async (fetchedRegistration) => {
  const { userId, eventId, paymentId } = fetchedRegistration;

  const qrData = {
    userId: userId._id,
    userName: userId.name,
    eventId: eventId._id,
    paymentId: paymentId._id,
    paymentTime: paymentId.paymentTime,
  };

  const filePath = path.join(
    __dirname,
    `qrcode-${eventId._id}-${userId._id}.png`
  );

  await QRCode.toFile(filePath, JSON.stringify(qrData), { width: 200 });

  return filePath;
};

function isAuthorized(userId, fetchedEvent) {
  return userId.toString() === fetchedEvent.clubId.toString();
}
