# CampusUnify

CampusUnify is a platform for university club management and student engagement. It aims to facilitate the organization and participation in various clubs and activities on campus. The application provides features for managing club details, events, and student registrations, along with payment processing integrated through Razorpay.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Club management 
- Event management
- Student registration for clubs and events
- Payment processing using Razorpay
- Role-based access control for club admins and users

## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
- **Frontend:**
  - React
  - Tailwind CSS
  - Axios
- **Payment Processing:**
  - Razorpay

## Installation

To get started with CampusUnify, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/PorePranav/CampusUnify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CampusUnify
   ```

3. Install the backend dependencies:

   ```bash
   cd server 
   npm install
   ```

4. Install the frontend dependencies:

   ```bash
   cd ../client
   npm install
   ```

5. Set up environment variables:

   Create proper `.env` file in the `client` and `config.env` in the `server` directories and add your configuration

6. Run the backend server:

   ```bash
   cd ../server
   npm run dev
   ```

7. In a new terminal, run the frontend development server:

   ```bash
   cd ../client
   npm run dev
   ```

## Usage

After starting the application, you can access the frontend at `http://localhost:3000`. 

- Register as a student or admin
- Manage clubs and events through the dashboard
- Participate in various club activities and events

## Contributing

I welcome contributions to CampusUnify! Please read [CONTRIBUTING.md](CONTRIBUTING.md) file for details on the process for submitting pull requests.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
