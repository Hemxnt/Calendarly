import { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ events, setEvents, editingEvent, setEditingEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      setDateTime(new Date(editingEvent.dateTime).toISOString().slice(0, 16)); // Ensure datetime is formatted correctly for the input
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      
      // Prepare dateTime in the correct format
      const formattedDateTime = new Date(dateTime).toISOString();

      if (editingEvent) {
        // Update existing event
        const res = await axios.put(
          `http://localhost:4000/api/events/${editingEvent.id}`,
          { title, description, dateTime: formattedDateTime },
          config
        );
        setEvents(events.map(event => (event.id === editingEvent.id ? res.data : event)));
        setEditingEvent(null);
      } else {
        // Create new event
        const res = await axios.post(
          'http://localhost:4000/api/events',
          { title, description, dateTime: formattedDateTime },
          config
        );
        setEvents([...events, res.data]);
      }

      // Clear form after successful submission
      setTitle('');
      setDescription('');
      setDateTime('');
    } catch (error) {
      console.error('Error while creating/updating event:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <textarea
        placeholder="Event description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingEvent ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;
