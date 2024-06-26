import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import ConfirmDelete from '../../ui/ConfirmDelete';
import EditDayForm from './EditDayForm';

import { useDeleteEventDay } from './useDeleteEventDay';

export default function EventDayMenu({ event, eventDay }) {
  const { deleteEventDay } = useDeleteEventDay();

  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={eventDay._id} />
          <Menus.List id={eventDay._id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil className="fill-primary-900" />}>
                Edit
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash className="fill-primary-900" />}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="edit">
          <EditDayForm event={event} day={eventDay} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={'event day'}
            onDeleteHandler={() =>
              deleteEventDay({ eventId: event._id, dayId: eventDay._id })
            }
          />
        </Modal.Window>
      </Modal>
    </Menus>
  );
}
