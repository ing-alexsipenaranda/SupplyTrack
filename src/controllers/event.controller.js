const Event = require('../models/Event');

async function getEvents(req, res) {
  try {
    const events = await Event.findAll();
    return res.json(events);
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    return res.status(500).json({ message: "Error retrieving events", error: error.message });
  }
}
async function createEvent(req, res) {
  try {
    const {
      name,
      version,
      description,
      location,
      start_date,
      end_date,
      created_by
    } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El campo 'title' es obligatorio." });
    }

    const eventPayload = {
      name,
      version,
      description,
      location,
      start_date,
      end_date,
      created_by
    };

    Object.keys(eventPayload).forEach(key => {
      if (eventPayload[key] === undefined) delete eventPayload[key];
    });

    const newEvent = await Event.create(eventPayload);

    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    return res.status(500).json({ message: "Error creating event", error: error.message });
  }
}
async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const {
            name,
            version,
            location,
            start_date,
            end_date,
            supplierId,
            created_by
        } = req.body;

        const eventPayload = {
            name,
            version,
            location,
            start_date,
            end_date,
            supplierId,
            created_by
        };

        Object.keys(eventPayload).forEach(key => {
            if (eventPayload[key] === undefined) delete eventPayload[key];
        });

        await event.update(eventPayload);

        return res.json(event);
    } catch (error) {       
        console.error("UPDATE EVENT ERROR:", error);
        return res.status(500).json({ message: "Error updating event", error: error.message });
    }
}
module.exports = {
  getEvents,
  createEvent,
  updateEvent
};
