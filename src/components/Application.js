import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import axios from 'axios';
import Appointment from 'components/Appointment/';
import { getAppointmentsForDay } from '../helpers/selectors';

import 'components/Application.scss';

// const appointments = [
//   {
//     id: 1,
//     time: '12pm',
//   },
//   {
//     id: 2,
//     time: '1pm',
//     interview: {
//       student: 'Lydia Miller-Jones',
//       interviewer: {
//         id: 2,
//         name: 'Tori Malcolm',
//         avatar: 'https://i.imgur.com/Nmx0Qxo.png',
//       },
//     },
//   },
//   {
//     id: 3,
//     time: '2pm',
//     interview: {
//       student: 'Miller-Jones',
//       interviewer: {
//         id: 1,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
// ];

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const setDays = (days) => setState({ ...state, days });
  const setDay = (day) => setState({ ...state, day });
  // const setAppointments = (appointments) => setState({ ...state, appointments });

  useEffect(() => {
    const apiDays = axios.get('/api/days');
    const apiAppointments = axios.get('api/appointments');
    const apiInterviewers = axios.get('api/interviewers');

    Promise.all([apiDays, apiAppointments, apiInterviewers])
      .then((response) => {
        const [days, appointments, interviewers] = response;
        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log('using getAppointmentForDay', getAppointmentsForDay(state, 'Monday'));
  const appt = dailyAppointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img className='sidebar--centered' src='images/logo.png' alt='Interview Scheduler' />
        <hr className='sidebar__separator sidebar--centered' />
        <DayList days={state.days} day={state.day} setDay={setDay} />
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
