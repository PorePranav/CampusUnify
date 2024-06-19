import PageLayout from '../styles/PageLayout';
import { Link } from 'react-router-dom';
import { useLatestEvents } from '../features/events/useLatestEvents';
import SpinnerMini from '../ui/SpinnerMini';
import { format } from 'date-fns';

export default function LandingPage() {
  const { isLoading, error, latestEvents } = useLatestEvents();

  return (
    <PageLayout>
      <div className="relative flex flex-col items-center">
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
      <h2 className="text-4xl font-bold mt-12">Key features</h2>
      <div className="flex mt-4 justify-between">
        <div className="w-64">
          <img
            src="./features/feature-1.jpg"
            className="w-64 rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">Event Listings</h2>
          <p className="mt-2 text-primary-900">
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
          <p className="mt-2 text-primary-900">
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
          <p className="mt-2 text-primary-900">
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
          <p className="mt-2 text-primary-900">
            Safely and securely register for events with integrated payment
            options, providing convenience without compromise.
          </p>
        </div>
      </div>
      <h2 className="text-4xl font-bold mt-12">Latest events</h2>
      <div>
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <div className="flex justify-between gap-4">
            {latestEvents.map((event) => (
              <Link to={`/events/${event._id}`}>
                <div key={event._id} className="mt-4">
                  <img
                    src={event.coverImage}
                    className="w-96 h-56 rounded-lg"
                    alt=""
                  />
                  <div className="mt-4">
                    <h2 className="font-semibold text-lg">{event.name}</h2>
                    <p className="text-primary-900 text-sm">
                      {format(new Date(event.date), 'EE, MMM d @ HH:mm')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div>
        <h2 className="text-4xl font-bold mt-12">
          What our customers are saying
        </h2>
        <div className="flex gap-4 mt-6">
          <div className="border-2 border-primary-200 rounded-xl p-4 h-48 w-1/3">
            <img
              src="/avatars/user-1.jpg"
              className="rounded-full object-cover w-12"
              alt="User Avatar"
            />
            <p className="font-semibold mt-4">
              University of California, Berkeley
            </p>
            <p className="text-md font-light text-primary-900 mt-2">
              "I love how easy it is to create and manage events. It's saved us
              so much time!"
            </p>
          </div>
          <div className="border-2 border-primary-200 rounded-xl p-4 h-48 w-1/3">
            <img
              src="/avatars/user-2.jpg"
              className="rounded-full object-cover w-12"
              alt="User Avatar"
            />
            <p className="font-semibold mt-4">
              University of Southern California
            </p>
            <p className="text-md font-light text-primary-900 mt-2">
              "CampusUnify has been a game changer for us. Out events have never
              looked better."
            </p>
          </div>
          <div className="border-2 border-primary-200 rounded-xl p-4 h-48 w-1/3">
            <img
              src="/avatars/user-3.jpg"
              className="rounded-full object-cover w-12"
              alt="User Avatar"
            />
            <p className="font-semibold mt-4">Stanford University</p>
            <p className="text-md font-light text-primary-900 mt-2">
              "Our students are loving the new registration process. It's so
              much faster and intuitive"
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
