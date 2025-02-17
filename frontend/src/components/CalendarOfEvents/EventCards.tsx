import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchEvents } from '../../store/slices/eventSlice';
import { MdEmojiEvents } from 'react-icons/md';
import { IoArrowUndoSharp, IoArrowRedo } from 'react-icons/io5';

interface EventCardProps {
    icon: React.ReactNode;
    count: number;
    label: string;
    description: string;
    iconBgColor: string;
}

const EventCard: React.FC<EventCardProps> = ({ icon, count, label, description, iconBgColor }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-5">
            <div className="flex gap-4 items-center">
                <div className={`p-4 rounded-full ${iconBgColor} flex items-center justify-center`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-4xl">{count}</p>
                        <p className="font-normal text-sm">{label}</p>
                    </div>
                    <div>
                        <p className='font-bold text-md text-blue-800'>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventCards: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { events, loading, error } = useSelector((state: RootState) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const currentYear = new Date().getFullYear();
    const eventsThisYear = events.filter(event => new Date(event.eventDate).getFullYear() === currentYear);
    const pastEvents = eventsThisYear.filter(event => new Date(event.eventDate) < new Date());
    const upcomingEvents = eventsThisYear.filter(event => new Date(event.eventDate) >= new Date());

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <EventCard
                icon={<MdEmojiEvents color="#fb923c" size={30} />}
                count={eventsThisYear.length}
                label="events"
                description={`Total Events in ${currentYear}`}
                iconBgColor="bg-orange-200"
            />
            <EventCard
                icon={<IoArrowUndoSharp color="#c084fc" size={25} />}
                count={pastEvents.length}
                label="events"
                description={`Past Events in ${currentYear}`}
                iconBgColor="bg-purple-200"
            />
            <EventCard
                icon={<IoArrowRedo color="#38bdf8" size={25} />}
                count={upcomingEvents.length}
                label="events"
                description={`Upcoming Events in ${currentYear}`}
                iconBgColor="bg-sky-200"
            />
        </div>
    );
};

export default EventCards;
