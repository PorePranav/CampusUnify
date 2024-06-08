import { useCart } from '../features/cart/useCart';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import { formatCurrency } from '../utils/helpers';

export default function Cart() {
  const { user, isLoading: isLoadingOne } = useUser();
  const {
    cart: { eventIds: cartEvents, totalAmount },
    isLoading: isLoadingTwo,
  } = useCart(user._id);

  return (
    <>
      {isLoadingOne || isLoadingTwo ? (
        <Spinner />
      ) : (
        <div className="w-[80%] my-6 mx-auto flex flex-col gap-4 p-4 bg-gray-100">
          <p className="text-2xl">My Cart</p>
          {cartEvents.map((event) => (
            <div
              key={event._id}
              className="flex flex-col md:flex-row bg-white shadow-md p-4 rounded-md"
            >
              <img
                src={event.coverImage}
                alt={event.name}
                className="w-full md:w-40 h-40 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <p className="text-sm text-gray-500 mb-2 md:mb-0">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-lg text-green-600 font-semibold font-sono">
                    {formatCurrency(event.eventCharges)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
