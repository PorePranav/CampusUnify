import PageLayout from '../styles/PageLayout';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <PageLayout>
      <div className="relative">
        <img
          className="w-[75%] mx-auto rounded-lg shadow-md"
          src="./landingpagehero.jpg"
          alt=""
        />
        <div className="absolute bottom-[5%] left-[15%] p-2 text-white">
          <p className="text-6xl font-bold leading-tight">
            College event management, <br />
            simplified!
          </p>
          <p className="mt-2">
            Plan, promote, and manage college events with ease
          </p>
          <Link to="/login">
            <button className="bg-primary-700 px-4 py-2 rounded-xl font-bold mt-4">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <h2 className="text-4xl font-bold mt-8">Key features</h2>
      <div className="flex mt-4 justify-between">
        <div className="w-64">
          <img
            src="./features/feature-1.jpg"
            className="w-64 rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">Event Listings</h2>
          <p>
            Easily discover and browse through a diverse range of campus events,
            from academic workshops to social gatherings, all in one place.
          </p>
        </div>
        <div className="w-64">
          <img
            src="./features/feature-2.jpg"
            className="w-64 rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">
            Registration Management
          </h2>
          <p>
            Seamlessly manage event registrations with intuitive tools for both
            organizers and participants, ensuring smooth and hassle-free
            attendance.
          </p>
        </div>
        <div className="w-64">
          <img
            src="./features/feature-3.jpg"
            className="w-64 rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">
            Event Details and Updates
          </h2>
          <p>
            Stay informed with comprehensive event details and real-time
            updates, keeping you in the loop every step of the way.
          </p>
        </div>
        <div className="w-64">
          <img
            src="./features/feature-4.jpg"
            className="w-64 rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">Secured Payments</h2>
          <p>
            Safely and securely register for events with integrated payment
            options, providing convenience without compromise.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
