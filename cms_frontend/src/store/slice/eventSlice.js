import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch all events from the server
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('https://cms-emba-api.vercel.app/all-events');
  return response.data;
});

// Async thunk to add a new event
export const addEvent = createAsyncThunk('events/addEvent', async (eventData) => {
  const response = await axios.post('https://cms-emba-api.vercel.app/add-event', eventData);
  return response.data;
});

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    editEvent(state, action) {
      const updatedEvent = action.payload;
      state.events = state.events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
    },
    deleteEvent(state, action) {
      const eventId = action.payload;
      state.events = state.events.filter((event) => event._id !== eventId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload.map((event) => ({
          ...event,
          title: `${event.title} (${event.leaderInCharge})`,
          start: new Date(event.eventDate),
          end: new Date(event.endOfEventDate),
        }));
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newEvent = {
          ...action.payload,
          title: `${action.payload.title} (${action.payload.leaderInCharge})`,
          start: new Date(action.payload.eventDate),
          end: new Date(action.payload.endOfEventDate),
        };
        state.events.push(newEvent);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { editEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;
