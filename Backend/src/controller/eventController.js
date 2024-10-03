const prisma = require('../prisma');

const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index (skip)
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    // Fetch the total count of events (for pagination metadata)
    const totalEvents = await prisma.event.count({
      where: { userId: req.user.id }, // Assuming userId is stored in req.user from JWT
    });

    // Fetch paginated events
    const events = await prisma.event.findMany({
      where: { userId: req.user.id },
      skip: skip,
      take: limit,
      orderBy: { date: 'asc' }, // Order by event date (optional)
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalEvents / limit);

    // Send response with events and pagination data
    res.status(200).json({
      events,
      pagination: {
        currentPage: page,
        totalPages,
        totalEvents,
      },
    });
} catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
}
  
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
