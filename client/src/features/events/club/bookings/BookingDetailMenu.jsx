import { HiEye } from 'react-icons/hi2';
import Modal from '../../../../ui/Modal';
import Menus from '../../../../ui/Menus';
import BookingDetailModal from './BookingDetailModal';

export default function BookingDetailMenu({ booking, event }) {
  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking._id} />
          <Menus.List id={booking._id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<HiEye className="fill-primary-600" />}>
                See Details
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="details">
          <BookingDetailModal booking={booking} />
        </Modal.Window>
      </Modal>
    </Menus>
  );
}
