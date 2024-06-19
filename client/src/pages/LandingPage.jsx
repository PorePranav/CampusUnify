import PageLayout from '../styles/PageLayout';
import { Link } from 'react-router-dom';
import { useLatestEvents } from '../features/events/useLatestEvents';
import SpinnerMini from '../ui/SpinnerMini';
import { format } from 'date-fns';

export default function LandingPage() {
  const { isLoading, error, latestEvents } = useLatestEvents();

  return (
    <PageLayout>
      <div className="relative flex flex-col items-center px-4 sm:px-8">
        <img
          className="w-full sm:w-[75%] mx-auto rounded-lg shadow-md"
          src="./landingpagehero.jpg"
          alt=""
        />
        <div className="absolute bottom-[10%] sm:bottom-[5%] left-[10%] sm:left-[15%] p-2 text-white">
          <p className="text-3xl sm:text-6xl font-bold leading-tight">
            College event management, <br />
            simplified!
          </p>
          <p className="mt-2 text-sm sm:text-base">
            Plan, promote, and manage college events with ease
          </p>
          <Link to="/login">
            <button className="bg-primary-700 px-4 py-2 rounded-xl font-bold mt-4 text-sm sm:text-base">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mt-12 text-center sm:text-left">
        Key features
      </h2>
      <div className="flex flex-col sm:flex-row mt-4 justify-between gap-4 px-4 sm:px-0">
        <div className="w-full sm:w-1/4">
          <img
            src="./features/feature-1.jpg"
            className="w-full rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">Event Listings</h2>
          <p className="mt-2 text-primary-900 text-sm sm:text-base">
            Easily discover and browse through a diverse range of campus events,
            from academic workshops to social gatherings, all in one place.
          </p>
        </div>
        <div className="w-full sm:w-1/4">
          <img
            src="./features/feature-2.jpg"
            className="w-full rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">
            Registration Management
          </h2>
          <p className="mt-2 text-primary-900 text-sm sm:text-base">
            Seamlessly manage event registrations with intuitive tools for both
            organizers and participants, ensuring smooth and hassle-free
            attendance.
          </p>
        </div>
        <div className="w-full sm:w-1/4">
          <img
            src="./features/feature-3.jpg"
            className="w-full rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">
            Event Details and Updates
          </h2>
          <p className="mt-2 text-primary-900 text-sm sm:text-base">
            Stay informed with comprehensive event details and real-time
            updates, keeping you in the loop every step of the way.
          </p>
        </div>
        <div className="w-full sm:w-1/4">
          <img
            src="./features/feature-4.jpg"
            className="w-full rounded-xl"
            alt=""
          />
          <h2 className="font-semibold text-lg mt-2">Secured Payments</h2>
          <p className="mt-2 text-primary-900 text-sm sm:text-base">
            Safely and securely register for events with integrated payment
            options, providing convenience without compromise.
          </p>
        </div>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mt-12 text-center sm:text-left">
        Latest events
      </h2>
      <div className="px-4 sm:px-0">
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {latestEvents ? (
              latestEvents.map((event) => (
                <Link to={`/events/${event._id}`} key={event._id}>
                  <div className="mt-4">
                    <img
                      src={event.coverImage}
                      className="w-full sm:w-96 h-56 rounded-lg object-cover"
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
              ))
            ) : (
              <p>There are currently no ongoing events</p>
            )}
          </div>
        )}
      </div>
      <div className="px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold mt-12 text-center sm:text-left">
          What our customers are saying
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="border-2 border-primary-200 rounded-xl p-4 h-auto sm:h-36 w-full sm:w-1/3 flex flex-col sm:flex-row">
            <img
              src="/avatars/user-1.jpg"
              className="rounded-full object-cover w-12 h-12 sm:mr-4"
              alt="User Avatar"
            />
            <div>
              <p className="font-semibold mt-4 sm:mt-0">
                University of California, Berkeley
              </p>
              <p className="text-md font-light text-primary-900 mt-2">
                "I love how easy it is to create and manage events. It's saved
                us so much time!"
              </p>
            </div>
          </div>
          <div className="border-2 border-primary-200 rounded-xl p-4 h-auto sm:h-36 w-full sm:w-1/3 flex flex-col sm:flex-row">
            <img
              src="/avatars/user-2.jpg"
              className="rounded-full object-cover w-12 h-12 sm:mr-4"
              alt="User Avatar"
            />
            <div>
              <p className="font-semibold mt-4 sm:mt-0">
                University of Southern California
              </p>
              <p className="text-md font-light text-primary-900 mt-2">
                "CampusUnify has been a game changer for us. Our events have
                never looked better."
              </p>
            </div>
          </div>
          <div className="border-2 border-primary-200 rounded-xl p-4 h-auto sm:h-36 w-full sm:w-1/3 flex flex-col sm:flex-row">
            <img
              src="/avatars/user-3.jpg"
              className="rounded-full object-cover w-12 h-12 sm:mr-4"
              alt="User Avatar"
            />
            <div>
              <p className="font-semibold mt-4 sm:mt-0">Stanford University</p>
              <p className="text-md font-light text-primary-900 mt-2">
                "Our students are loving the new registration process. It's so
                much faster and intuitive"
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
