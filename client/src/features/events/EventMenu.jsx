import { HiEye, HiPencil, HiTrash, HiShoppingCart } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import EditEventForm from './EditEventForm';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useNavigate } from 'react-router-dom';
import { useDeleteEvent } from './useDeleteEvent';
import { useAddCartItem } from '../cart/useAddCartItem';

export default function EventMenu({ event, user }) {
  const navigate = useNavigate();
  const { deleteEvent } = useDeleteEvent();
  const { addToCart } = useAddCartItem();

  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={event._id} />
          <Menus.List id={event._id}>
            <Menus.Button
              onClick={() => navigate(`/events/${event._id}`)}
              icon={<HiEye className="fill-primary-900" />}
            >
              See Details
            </Menus.Button>
            {user.role === 'club' && (
              <>
                <Modal.Open opens="edit">
                  <Menus.Button
                    icon={<HiPencil className="fill-primary-900" />}
                  >
                    Edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash className="fill-primary-900" />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </>
            )}
            {user.role === 'user' && new Date() < new Date(event.date) && (
              <Menus.Button
                icon={<HiShoppingCart className="fill-primary-900" />}
                onClick={() => addToCart(event._id)}
              >
                Add to Cart
              </Menus.Button>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="edit">
          <EditEventForm event={event} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={'event'}
            onDeleteHandler={() => deleteEvent(event._id)}
          />
        </Modal.Window>
      </Modal>
    </Menus>
  );
}
