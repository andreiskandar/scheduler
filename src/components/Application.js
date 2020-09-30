import React, { useState } from 'react';
import DayList from './DayList';
import Appointment from 'components/Appointment/';
import 'components/Application.scss';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
];

export default function Application(props) {
  const appt = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  const [day, setDay] = useState('Monday');
  const days = [
    {
      id: 1,
      name: 'Monday',
      spots: 2,
    },
    {
      id: 2,
      name: 'Tuesday',
      spots: 5,
    },
    {
      id: 3,
      name: 'Wednesday',
      spots: 0,
    },
  ];
  return (
    <main className='layout'>
      <section className='sidebar'>
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img className='sidebar--centered' src='images/logo.png' alt='Interview Scheduler' />
        <hr className='sidebar__separator sidebar--centered' />
        <DayList days={days} day={day} setDay={setDay} />
        <nav className='sidebar__menu'></nav>
        <img className='sidebar__lhl sidebar--centered' src='images/lhl.png' alt='Lighthouse Labs' />
      </section>
      <section className='schedule'>
        {appt}
        <Appointment key='last' time='5pm' />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
