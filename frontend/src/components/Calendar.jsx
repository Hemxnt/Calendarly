import axios from 'axios';

const Calendar = ({ events, setEditingEvent }) => {
  const handleDelete = async (id) => {
    await axios.delete(`https://calendarly.onrender.com/api/events/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    window.location.reload();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Events</h2>
      {events.length ? (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-4">
              <h3 className="font-bold">{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.dateTime).toLocaleString()}</p>
              <button onClick={() => setEditingEvent(event)} className="mr-4 text-blue-500">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default Calendar;
