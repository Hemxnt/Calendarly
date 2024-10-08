import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from '../components/Calendar';
import EventForm from '../components/EventForm';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://calendarly.onrender.com/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEvents(res.data);
      } catch (error) {
        console.log('Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  // const prevPost = () => {

  // }

  // const nextPost = () => {

  // }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Calendar</h1>
      <EventForm events={events} setEvents={setEvents} editingEvent={editingEvent} setEditingEvent={setEditingEvent} />
      <Calendar events={events} setEditingEvent={setEditingEvent} />
      <div>
        <button >Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default Home;
