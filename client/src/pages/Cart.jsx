import { useCart } from '../features/cart/useCart';
import { HiTrash } from 'react-icons/hi2';
import Spinner from '../ui/Spinner';
import { formatCurrency } from '../utils/helpers';
import { useDeleteCartItem } from '../features/cart/useDeleteCartItem';
import { useClearCart } from '../features/cart/useClearCart';
import { usePayment } from '../features/cart/usePayment';

export default function Cart() {
  const { cart, isLoading } = useCart();
  const { deleteFromCart, isDeleting } = useDeleteCartItem();
  const { clearCart, isClearing } = useClearCart();
  const { initiatePayment } = usePayment();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-[80%] my-6 mx-auto p-4 bg-gray-100">
          <p className="text-2xl">My Cart</p>
          {cart.eventIds.length > 0 ? (
            <>
              <div className="flex gap-4">
                <button
                  className="bg-red-700 mt-4 text-white px-4 py-2 mb-4 font-semibold rounded-md"
                  onClick={clearCart}
                  disabled={isClearing}
                >
                  Clear Cart
                </button>
                <button
                  className="bg-green-700 mt-4 text-white px-4 py-2 mb-4 font-semibold rounded-md"
                  onClick={initiatePayment}
                  disabled={cart.eventIds.length === 0}
                >
                  Check Out
                </button>
              </div>
              {cart.eventIds.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col md:flex-row bg-white shadow-md p-4 rounded-md mb-4"
                >
                  <img
                    src={event.coverImage}
                    alt={event.name}
                    className="w-full md:w-40 h-40 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                      <p className="text-gray-600 mb-2">{event.description}</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <p className="text-sm text-gray-500 mb-2 md:mb-0">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-lg text-green-600 font-semibold font-sono">
                        {formatCurrency(event.eventCharges)}
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={isDeleting}
                    onClick={() => deleteFromCart(event._id)}
                    className="flex items-center justify-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <HiTrash size={24} />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <h2 className="text">There are no items present your cart!</h2>
          )}
        </div>
      )}
    </>
  );
}
