import PageLayout from '../styles/PageLayout';
import { useCart } from '../features/cart/useCart';
import { useDeleteCartItem } from '../features/cart/useDeleteCartItem';
import { useClearCart } from '../features/cart/useClearCart';
import { usePayment } from '../features/cart/usePayment';
import Spinner from '../ui/Spinner';
import { formatCurrency, formatDateTimeDetailed } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, isLoading } = useCart();
  const { deleteFromCart, isDeleting } = useDeleteCartItem();
  const { clearCart, isClearing } = useClearCart();
  const { initiatePayment } = usePayment();

  return (
    <PageLayout>
      <h2 className="text-3xl font-bold mt-4">Your Cart</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {cart.eventIds.length === 0 ? (
            <p className="mt-2">
              There are no items present your cart!
              <Link to="/events" className="text-blue-500 hover:text-blue-700">
                {' '}
                Add new items to your car &rarr;
              </Link>
            </p>
          ) : (
            <>
              {cart.eventIds.map((event) => (
                <div className="flex gap-4">
                  <img
                    src={event.cardImage}
                    className="w-28 h-28 rounded-lg"
                    alt=""
                  />
                  <div className="flex flex-col justify-between py-4">
                    <p className="text-lg">{event.name}</p>
                    <p className="text-primary-700 font-light">
                      {formatCurrency(event.eventCharges)}
                    </p>
                    <p className="text-primary-700 font-light">
                      {formatDateTimeDetailed(event.date)}
                    </p>
                  </div>
                  <button
                    className="justify-self-end self-center ml-auto bg-skin px-4 py-2 rounded-lg font-bold"
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
              <div className="flex justify-end gap-4">
                <button
                  className="bg-skin px-4 py-2 rounded-lg font-bold"
                  onClick={clearCart}
                  disabled={isClearing}
                >
                  Clear Cart
                </button>
                <button
                  className="bg-primary-700 px-4 py-2 rounded-lg font-bold text-white"
                  onClick={initiatePayment}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
}
