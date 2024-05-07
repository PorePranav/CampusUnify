import { formatCurrency, formatDate } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import {
  HiBanknotes,
  HiCalendarDays,
  HiCube,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import { useDeleteEvent } from "../useDeleteEvent";

export default function EventClubCard({ event }) {
  const navigate = useNavigate();
  const { deleteEvent, isLoading: isDeleting } = useDeleteEvent();

  return (
    <div className="bg-white p-3 rounded-md shadow-md">
      <img
        src={event.cardImage}
        alt={`cardImage for ${event.name} event`}
        className="h-72"
      />
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex gap-4">
            <HiCube className="h-6 w-6 fill-primary-orange" />
            <p>{event.name}</p>
          </div>
          <div className="flex gap-4">
            <HiCalendarDays className="h-6 w-6 fill-primary-orange" />
            <p>{formatDate(event.date)}</p>
          </div>
          <div className="flex gap-4">
            <HiBanknotes className="h-6 w-6 fill-primary-orange" />
            <p className="font-sono">{formatCurrency(event.eventCharges)}</p>
          </div>
        </div>
        <Menus>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={event._id} />
              <Menus.List id={event._id}>
                <Menus.Button
                  icon={<HiEye className="fill-primary-orange" />}
                  onClick={() => navigate(`events/${event._id}`)}
                >
                  See Details
                </Menus.Button>
                <Modal.Open opens="delete">
                  <Menus.Button
                    icon={<HiTrash className="fill-primary-orange" />}
                  >
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
      </div>
    </div>
  );
}
