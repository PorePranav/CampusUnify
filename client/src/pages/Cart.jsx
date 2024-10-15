import {
  HiOutlineShoppingCart,
  HiOutlineTrash,
  HiOutlineX,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useCart } from '../features/cart/useCart';
import { useClearCart } from '../features/cart/useClearCart';
import { useDeleteCartItem } from '../features/cart/useDeleteCartItem';
import { usePayment } from '../features/cart/usePayment';
import PageLayout from '../styles/PageLayout';
import Spinner from '../ui/Spinner';
import { formatCurrency, formatDateTimeDetailed } from '../utils/helpers';

export default function Cart() {
  const { cart, isLoading } = useCart();
  const { deleteFromCart, isDeleting } = useDeleteCartItem();
  const { clearCart, isClearing } = useClearCart();
  const { initiatePayment } = usePayment();

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6 transition-colors duration-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <HiOutlineShoppingCart className="mr-2" />
          Your Cart
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6">
            {cart.eventIds.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl mb-4">Your cart is empty</p>
                <Link
                  to="/events"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-primary-700"
                >
                  Browse Events
                </Link>
              </div>
            ) : (
              <>
                {cart.eventIds.map((event) => (
                  <div
                    key={event._id}
                    className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 p-4 dark:bg-gray-700 hover:bg-primary-25 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
                  >
                    <img
                      src={event.cardImage}
                      className="w-full h-48 md:w-24 md:h-24 rounded-md object-cover"
                      alt={event.name}
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <p className="text-primary-600 dark:text-primary-400">
                        {formatCurrency(event.eventCharges)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTimeDetailed(event.date)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors duration-300 disabled:opacity-50"
                      disabled={isDeleting}
                      onClick={() => deleteFromCart(event._id)}
                      aria-label="Remove item"
                    >
                      <HiOutlineX className="w-6 h-6" />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold">
                    Total: {formatCurrency(cart.totalAmount)}
                  </p>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg transition-colors duration-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800 disabled:opacity-50"
                      onClick={clearCart}
                      disabled={isClearing}
                    >
                      <HiOutlineTrash className="inline-block mr-2 w-5 h-5" />
                      Clear Cart
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-primary-700"
                      onClick={initiatePayment}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
