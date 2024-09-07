import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Event {
    _id?: string;
    title: string;
    eventDate: string;
    endOfEventDate?: string;
    leaderInCharge?: string;
    daysTo: number;
}

interface EventState {
    events: Event[];
    loading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
};

// Async thunk for fetching events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response = await fetch('http://172.17.0.1:5500/all-events');
    if (!response.ok) throw new Error('Failed to fetch events');
    return (await response.json()) as Event[];
});

// Async thunk for adding an event
export const addEvent = createAsyncThunk('events/addEvent', async (newEvent: Event) => {
    const response = await fetch('http://172.17.0.1:5500/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
    });
    if (!response.ok) throw new Error('Failed to add event');
    return (await response.json()) as Event;
});

// Async thunk for editing an event
export const editEvent = createAsyncThunk('events/editEvent', async (updatedEvent: Event) => {
    const response = await fetch(`http://172.17.0.1:5500/update-event/${updatedEvent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
    });
    if (!response.ok) throw new Error('Failed to edit event');
    return (await response.json()) as Event;
});

// Async thunk for deleting an event
export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId: string) => {
    const response = await fetch(`http://172.17.0.1:5500/delete-event/${eventId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete event');
    return eventId;
});

// Event slice
const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Events
        builder.addCase(fetchEvents.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.loading = false;
            state.events = action.payload;
        });
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch events';
        });

        // Add Event
        builder.addCase(addEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
            state.loading = false;
            state.events.push(action.payload);
        });
        builder.addCase(addEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to add event';
        });

        // Edit Event
        builder.addCase(editEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editEvent.fulfilled, (state, action: PayloadAction<Event>) => {
            state.loading = false;
            const index = state.events.findIndex((event) => event._id === action.payload._id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        });
        builder.addCase(editEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to edit event';
        });

        // Delete Event
        builder.addCase(deleteEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.events = state.events.filter((event) => event._id !== action.payload);
        });
        builder.addCase(deleteEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete event';
        });
    },
});

export default eventSlice.reducer;
