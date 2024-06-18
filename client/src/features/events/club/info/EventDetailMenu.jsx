import { HiEye, HiTrash } from 'react-icons/hi2';
import Modal from '../../../../ui/Modal';
import Menus from '../../../../ui/Menus';
import ConfirmDelete from '../../../../ui/ConfirmDelete';
import { useDeleteEvent } from '../../useDeleteEvent';
import { useNavigate } from 'react-router-dom';

export default function EventDetailMenu({ event }) {
  const navigate = useNavigate();
  const { deleteEvent } = useDeleteEvent();

  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={event._id} />
          <Menus.List id={event._id}>
            <Menus.Button
              icon={<HiEye className="fill-primary-600" />}
              onClick={() => navigate(`/events/${event._id}`)}
            >
              See Details
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash className="fill-primary-600" />}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="event"
            onDeleteHandler={() => deleteEvent(event._id)}
          />
        </Modal.Window>
      </Modal>
    </Menus>
  );
}
