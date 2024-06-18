import { HiTrash, HiPencil } from 'react-icons/hi2';
import Modal from '../../../../ui/Modal';
import Menus from '../../../../ui/Menus';
import useDeleteEventDay from '../../useDeleteEventDay';
import ConfirmDelete from '../../../../ui/ConfirmDelete';
import EditDayForm from './EditDayForm';

export default function DayDetailMenu({ day, event }) {
  const { deleteEventDay } = useDeleteEventDay();

  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={day._id} />
          <Menus.List id={day._id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<HiPencil className="fill-primary-600" />}>
                Edit Day
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash className="fill-primary-600" />}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="details">
          <EditDayForm event={event} day={day} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="day"
            onDeleteHandler={() =>
              deleteEventDay({ eventId: event._id, dayId: day._id })
            }
          />
        </Modal.Window>
      </Modal>
    </Menus>
  );
}
