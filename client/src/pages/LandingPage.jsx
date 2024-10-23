import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useLatestEvents } from '../features/events/useLatestEvents';
import PageLayout from '../styles/PageLayout';
import SpinnerMini from '../ui/SpinnerMini';

export default function LandingPage() {
  const { isLoading, latestEvents } = useLatestEvents();

  return (
    <PageLayout>
      <div className="mx-auto transition-colors duration-300">
        <div className="relative flex flex-col items-center px-4 sm:px-8">
          <div className="w-full sm:w-[75%] mx-auto relative">
            <img
              className="w-full rounded-lg shadow-md"
              src="./landingpagehero.jpg"
              alt="Landing page hero"
            />
            <div className="absolute inset-0 p-4 sm:p-8 text-white bg-black bg-opacity-50 rounded-lg flex flex-col justify-end">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                College event management, <br className="hidden sm:inline" />
                simplified!
              </h1>
              <p className="hidden mt-2 text-sm sm:text-base md:text-lg">
                Plan, promote, and manage college events with ease
              </p>
              <Link to="/login">
                <button
                  type="button"
                  className="bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded-xl font-bold mt-4 text-sm sm:text-base transition-colors duration-300"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mt-12 text-center sm:text-left px-4 sm:px-0">
          Key features
        </h2>
        <div className="flex flex-col sm:flex-row mt-4 justify-between gap-4 px-4 sm:px-0">
          {[
            {
              img: './features/feature-1.jpg',
              title: 'Event Listings',
              description:
                'Easily discover and browse through a diverse range of campus events, from academic workshops to social gatherings, all in one place.',
            },
            {
              img: './features/feature-2.jpg',
              title: 'Registration Management',
              description:
                'Seamlessly manage event registrations with intuitive tools for both organizers and participants, ensuring smooth and hassle-free attendance.',
            },
            {
              img: './features/feature-3.jpg',
              title: 'Event Details and Updates',
              description:
                'Stay informed with comprehensive event details and real-time updates, keeping you in the loop every step of the way.',
            },
            {
              img: './features/feature-4.jpg',
              title: 'Secured Payments',
              description:
                'Safely and securely register for events with integrated payment options, providing convenience without compromise.',
            },
          ].map((feature, index) => (
            <div key={index} className="w-full sm:w-1/4 mb-4 sm:mb-0">
              <img
                src={feature.img}
                className="w-full rounded-xl"
                alt={feature.title}
              />
              <h2 className="font-semibold text-lg mt-2">{feature.title}</h2>
              <p className="mt-2 text-primary-900 dark:text-primary-100 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mt-12 text-center sm:text-left px-4 sm:px-0">
          Latest events
        </h2>
        <div className="px-4 sm:px-0">
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {latestEvents ? (
                latestEvents.map((event) => (
                  <Link to={`/events/${event._id}`} key={event._id}>
                    <div className="mt-4">
                      <img
                        src={event.coverImage}
                        className="w-full h-56 rounded-lg object-cover"
                        alt=""
                      />
                      <div className="mt-4">
                        <h2 className="font-semibold text-lg">{event.name}</h2>
                        <p className="text-primary-900 dark:text-primary-100 text-sm">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                avatar: '/avatars/user-1.jpg',
                university: 'University of California, Berkeley',
                quote:
                  "I love how easy it is to create and manage events. It's saved us so much time!",
              },
              {
                avatar: '/avatars/user-2.jpg',
                university: 'University of Southern California',
                quote:
                  'CampusUnify has been a game changer for us. Our events have never looked better.',
              },
              {
                avatar: '/avatars/user-3.jpg',
                university: 'Stanford University',
                quote:
                  "Our students are loving the new registration process. It's so much faster and intuitive",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="border-2 border-primary-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center"
              >
                <img
                  src={testimonial.avatar}
                  className="rounded-full object-cover w-12 h-12 sm:mr-4 mb-4 sm:mb-0"
                  alt="User Avatar"
                />
                <div>
                  <p className="font-semibold">{testimonial.university}</p>
                  <p className="text-md font-light text-primary-900 dark:text-primary-100 mt-2">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}