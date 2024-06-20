const Event = require('../models/event');
const express = require('express');

const router = express.Router();


// Create a calendar event
router.post('/add-event', async (req, res) => {
    try{
        // extract req.body info
        const {title, eventDate, leaderInCharge, deleted} = req.body;
        if(!title || !eventDate || !leaderInCharge ||deleted){
            res.status(400).json({message : "Please enter all the required information"})
        }

        let eventDateObj = new Date(eventDate);
        let currentDateObj = new Date();

        let timeDifference = eventDateObj - currentDateObj; // Difference in milliseconds
        let dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

        const timeline = Math.floor(dayDifference)

        let newEvent = new Event({
            title, 
            eventDate, 
            leaderInCharge, 
            timeline,
            deleted
        });

        newEvent.save();
        res.status(201).json({message: "New event calendar created!", data: newEvent});

    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error creating an event!"})
    }
});

// View all calendar of event
router.get("/all-events", async (req, res) => {
    try {
      const allEvents = await Event.find({ deleted: false });
      res
        .status(200)
        .json(allEvents);
    } catch (err) {
      const errorMessage = err.message || "Error getting members";
      res
        .status(500)
        .json({ message: "Could not restrieve calendar of events.", error: errorMessage });
    }
  });

  //retrieve an event
router.get("/single-event/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const event = await Event.find({_id : id});
      
      if(event.deleted === true){
        res.json("The event no longer exists")
      }
      res
      .status(200)
      .json(event);
    } catch (err) {
      const errorMessage = err.message || "Error getting the member";
      res.status(500).json({
        message: "Could not restrieve the event.",
        error: errorMessage,
      });
    }
  });

  //Update an event 
router.post("/update-event/:id", async (req, res) => {
    try {
      //filter(search by id)
      const id = req.params.id;
      if(!id){
        res.json({message: "Could not find the ID"})
      }
      const {
        title, 
        eventDate, 
        leaderInCharge, 
        timeline,
        deleted
      } = req.body;
  
      //options
      const options = { new: true, upsert : true };
  
  
      // the update
      const newUpdate = await Event.findByIdAndUpdate(
        id,
        {
            title, 
            eventDate, 
            leaderInCharge, 
            timeline,
            deleted
        },
        options
      );
      res.status(200).json(newUpdate);
    } catch (err) {
      const errorMessage = err.message || "Error updating the record";
      res.status(500).json({
        message: "Could not update the event!",
        error: errorMessage,
      });
    }
  });

  //delete an event record
router.post("/delete-event/:id", async (req, res) => {
    try {
      const id = req.params.id;
      
      const record = await Event.findOne( {_id: id});

      const deletedStatus = record.deleted;

      //the update to be implemented on the filter
      const deleted = { $set: { deleted : true } };
      //options
      const options = { new: true };
  
      // //perform the delete
      const deletedEvent = await Event.findByIdAndUpdate(id, deleted, options);
      res
        .status(200)
        .json(deletedEvent);
  
    } catch (err) {
      const errorMessage = err.message || "Error deleting the record";
      res.status(500).json({
        message: "Could not delete the event.",
        error: errorMessage,
      });
    }
  });


module.exports = router;