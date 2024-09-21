const prisma = require('../prisma');

const getEvents = async (req, res) => {
  const events = await prisma.event.findMany({ where: { userId: req.userId } });
  res.json(events);
};

const createEvent = async (req, res) => {
  const { title, description, dateTime } = req.body;
  const event = await prisma.event.create({
    data: { title, description, dateTime, userId: req.userId },
  });
  res.json(event);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, dateTime } = req.body;
  const event = await prisma.event.update({
    where: { id: Number(id), userId: req.userId },
    data: { title, description, dateTime },
  });
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  await prisma.event.delete({ where: { id: Number(id), userId: req.userId } });
  res.sendStatus(204);
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
