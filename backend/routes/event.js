const Event = require('../models/event');
const express = require('express');

const router = express.Router();

// Create a calendar event
router.post('/backend/add-event', async (req, res) => {
    try {
        // extract req.body info
        const {title, eventDate, endOfEventDate, leaderInCharge, targetAudience, location, eventLevel, deleted} = req.body;
        if(!title || !eventDate  || !leaderInCharge || !targetAudience){
            return res.status(400).json({message : "Please enter all the required information"});
        }

        let eventDateObj = new Date(eventDate);
        let currentDateObj = new Date();

        let timeDifference = eventDateObj - currentDateObj; // Difference in milliseconds
        let dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

        const daysTo = Math.floor(dayDifference);

        let newEvent = new Event({
            title, 
            eventDate, 
            endOfEventDate,
            leaderInCharge, 
            eventLevel,
            location,
            targetAudience,
            daysTo,
            deleted: deleted || false
        });

        await newEvent.save();
        res.status(201).json({message: "New event calendar created!", data: newEvent});

    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Error creating an event!"});
    }
});

// View all calendar of events
router.get("/backend/all-events", async (req, res) => {
    try {
        const allEvents = await Event.find({ deleted: false });
        res.status(200).json(allEvents);
    } catch (err) {
        const errorMessage = err.message || "Error getting events";
        res.status(500).json({ message: "Could not retrieve calendar of events.", error: errorMessage });
    }
});

// Retrieve a single event
router.get("/backend/single-event/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.deleted) {
            return res.status(410).json({ message: "The event no longer exists" });
        }

        res.status(200).json(event);
    } catch (err) {
        const errorMessage = err.message || "Error getting the event";
        res.status(500).json({
            message: "Could not retrieve the event.",
            error: errorMessage,
        });
    }
});

// Update an event 
router.post("/backend/update-event/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Event ID is required" });
        }

        const {
            title, 
            eventDate, 
            endOfEventDate,
            leaderInCharge,
            eventLevel,
            location, 
            targetAudience,
            deleted
        } = req.body;

        const options = { new: true, runValidators: true };

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                title, 
                eventDate, 
                endOfEventDate,
                leaderInCharge,
                eventLevel,
                location, 
                targetAudience,
                deleted
            },
            options
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(updatedEvent);
    } catch (err) {
        const errorMessage = err.message || "Error updating the event";
        res.status(500).json({
            message: "Could not update the event!",
            error: errorMessage,
        });
    }
});

// Delete an event record (soft delete)
router.post("/backend/delete-event/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        const updatedEvent = await Event.findByIdAndUpdate(
            id, 
            { $set: { deleted: true } },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully", data: updatedEvent });
    } catch (err) {
        const errorMessage = err.message || "Error deleting the event";
        res.status(500).json({
            message: "Could not delete the event.",
            error: errorMessage,
        });
    }
});

module.exports = router;