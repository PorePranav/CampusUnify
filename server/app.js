from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///registrations.db'
db = SQLAlchemy(app)

# Define the registration model with a unique constraint on email
class Registration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    event = db.Column(db.String(100), nullable=False)

# Ensure database exists
with app.app_context():
    db.create_all()

# Route to handle event registration
@app.route('/register', methods=['POST'])
def register():
    try:
        # Validate that all fields are provided
        name = request.form.get('name')
        email = request.form.get('email')
        event = request.form.get('event')

        if not name or not email or not event:
            return jsonify({"error": "All fields are required"}), 400

        # Create a new registration entry
        new_registration = Registration(name=name, email=email, event=event)
        db.session.add(new_registration)
        db.session.commit()
        return jsonify({"message": "Successfully registered!"}), 201

    except IntegrityError:
        # Handle duplicate registration (same email)
        db.session.rollback()
        return jsonify({"error": "This email is already registered"}), 409

    except SQLAlchemyError as e:
        # Catch any other database-related errors
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    except Exception as e:
        # Handle unexpected errors
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routers/userRoutes');
const eventRouter = require('./routers/eventRoutes');
const cartRouter = require('./routers/cartRoutes');
const paymentRouter = require('./routers/paymentRoutes');
const bookingsRouter = require('./routers/bookingsRoutes');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/bookings', bookingsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
