import { HiEye, HiTrash } from 'react-icons/hi2';
import Modal from '../../../../ui/Modal';
import Menus from '../../../../ui/Menus';
import useDeleteEventBooking from '../../useDeleteEventBooking';
import ConfirmDelete from '../../../../ui/ConfirmDelete';
import BookingDetailModal from './BookingDetailModal';

export default function BookingDetailMenu({ booking, event }) {
  const { deleteEventBooking } = useDeleteEventBooking();

  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking._id} />
          <Menus.List id={booking._id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<HiEye className="fill-primary-orange" />}>
                See Details
              </Menus.Button>
            </Modal.Open>
            {/* <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash className="fill-primary-orange" />}>
                Delete
              </Menus.Button>
            </Modal.Open> */}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="details">
          <BookingDetailModal booking={booking} />
        </Modal.Window>
        {/* <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onDeleteHandler={() =>
              deleteEventBooking({ eventId: event._id, bookingId: booking._id })
            }
          />
        </Modal.Window> */}
      </Modal>
    </Menus>
  );
}
