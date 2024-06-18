import Modal from '../../../../ui/Modal';
import CreateEventDayForm from './CreateEventDayForm';

export default function AddEventDay({ event }) {
  return (
    <div className="mt-4">
      <Modal>
        <Modal.Open opens="event-day-form">
          <button className="py-2 px-4 bg-primary-600 text-white font-semibold rounded-md">
            Add Event Day
          </button>
        </Modal.Open>
        <Modal.Window name="event-day-form">
          <CreateEventDayForm event={event} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
