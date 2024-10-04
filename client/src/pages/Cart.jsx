import PageLayout from '../styles/PageLayout';
import { useCart } from '../features/cart/useCart';
import { useDeleteCartItem } from '../features/cart/useDeleteCartItem';
import { useClearCart } from '../features/cart/useClearCart';
import { usePayment } from '../features/cart/usePayment';
import Spinner from '../ui/Spinner';
import { formatCurrency, formatDateTimeDetailed } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { Context } from '../main';
import { useContext } from 'react';

export default function Cart() {
  const { isDarkMode } = useContext(Context);

  const { cart, isLoading } = useCart();
  const { deleteFromCart, isDeleting } = useDeleteCartItem();
  const { clearCart, isClearing } = useClearCart();
  const { initiatePayment } = usePayment();

  return (
    <PageLayout>
      <div
        className={`w-[80%] mx-auto p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
        }`}
      >
        <h2 className="text-3xl font-bold mt-4">Your Cart</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {cart.eventIds.length === 0 ? (
              <p className="mt-2">
                There are no items present in your cart!
                <Link
                  to="/events"
                  className="text-blue-500 hover:text-blue-700 ml-1"
                >
                  Add new items to your cart &rarr;
                </Link>
              </p>
            ) : (
              <>
                {cart.eventIds.map((event) => (
                  <div
                    key={event._id}
                    className="flex gap-4 items-center p-4 rounded-lg transition-colors duration-300 
                               hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <img
                      src={event.cardImage}
                      className="w-28 h-28 rounded-lg object-cover"
                      alt={event.name}
                    />
                    <div className="flex flex-col justify-between py-4 flex-1">
                      <p className="text-lg">{event.name}</p>
                      <p className="text-primary-700 dark:text-primary-400 font-light">
                        {formatCurrency(event.eventCharges)}
                      </p>
                      <p className="text-primary-700 dark:text-primary-400 font-light">
                        {formatDateTimeDetailed(event.date)}
                      </p>
                    </div>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold self-center ml-auto
                                 transition-colors duration-300 hover:bg-red-500 disabled:opacity-50"
                      disabled={isDeleting}
                      onClick={() => deleteFromCart(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <p className="text-xl font-semibold">
                  Total: {formatCurrency(cart.totalAmount)}
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    className="bg-yellow-500 px-4 py-2 rounded-lg font-bold transition-colors 
                               duration-300 hover:bg-yellow-400 disabled:opacity-50"
                    onClick={clearCart}
                    disabled={isClearing}
                  >
                    Clear Cart
                  </button>
                  <button
                    className="bg-primary-700 text-white px-4 py-2 rounded-lg font-bold 
                               transition-colors duration-300 hover:bg-primary-600"
                    onClick={initiatePayment}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
