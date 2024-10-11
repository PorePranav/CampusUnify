import React from 'react';
import Modal from '../../ui/Modal';
import CreateEventForm from './CreateEventForm';

export default function AddEvent() {
  return (
    <Modal>
      <Modal.Open opens="event-form">
        <button
          type="button"
          className="py-2 px-4 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Add New Event
        </button>
      </Modal.Open>
      <Modal.Window name="event-form">
        <CreateEventForm />
      </Modal.Window>
    </Modal>
  );
}
