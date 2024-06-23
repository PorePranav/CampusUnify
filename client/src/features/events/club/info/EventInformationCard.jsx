import { HiPencil } from 'react-icons/hi2';
import Modal from '../../../../ui/Modal';
import EditEventForm from '../EditEventForm';

import { formatDate, formatCurrency } from '../../../../utils/helpers';
import { useUser } from '../../../authentication/useUser';

export default function EventInformationCard({ event }) {
  const { user } = useUser();

  return (
    <div className="mt-4">
      {user.role === 'club' && (
        <Modal>
          <Modal.Open opens="edit-event-form">
            <button className="bg-primary-600 px-4 py-2 text-white font-bold rounded-lg flex items-center">
              <HiPencil className="mr-1 h-4 w-4" /> Edit Event
            </button>
          </Modal.Open>
          <Modal.Window name="edit-event-form">
            <EditEventForm event={event} />
          </Modal.Window>
        </Modal>
      )}
      <img
        className="w-full h-128 rounded-lg mt-4"
        alt="event-cover"
        src={event.coverImage}
      />
      <h2 className="font-bold text-2xl mt-4">{event.name}</h2>
      <div className="mt-2">
        <p className="text-xl font-bold">About the event</p>
        <p>{event.description}</p>
      </div>
      <p>
        The event is on{' '}
        <span className="font-semibold">{formatDate(event.date)}</span> with
        registration fees of{' '}
        <span className="font-sono font-semibold">
          {formatCurrency(event.eventCharges)}
        </span>
      </p>
    </div>
  );
}
