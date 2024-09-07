import React, { useMemo, useCallback } from "react";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';

interface Event {
  time: string;
  title: string;
}

const eventsList = (date: Date): Event[] => {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' }
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' }
      ];
    default:
      return [];
  }
};

const BigCalendar: React.FC = () => {
    <style>
        {`
      .bg-gray {
        background-color: rgba(242, 242, 242, 0.3);
      }
      `}
    </style>
  const renderCell = useCallback((date: Date) => {
    const list = eventsList(date);
    const displayList = list.slice(0, 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = moreCount > 0 && (
        <li key="more">
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreItem}
        </ul>
      );
    }

    return null;
  }, []);

  const memoizedCalendar = useMemo(() => (
      <Calendar bordered renderCell={renderCell} className='text-blue-900 font-bold bg-white shadow-sm shadow-gray-500 h-3/4' cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} height={200} />
  ), [renderCell]);

  return memoizedCalendar;
};

export default React.memo(BigCalendar);

