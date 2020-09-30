import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import axios from 'axios';
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
        id: 2,
        name: 'Tori Malcolm',
        avatar: 'https://i.imgur.com/Nmx0Qxo.png',
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
  const [days, setDays] = useState([]);
  const apiDays = '/api/days';
  useEffect(() => {
    axios.get(apiDays).then((res) => {
      setDays([...res.data]);
      console.log(res.data);
    });
  }, []);

  const appt = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

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
