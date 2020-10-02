import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import axios from 'axios';
import Appointment from 'components/Appointment/';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

import 'components/Application.scss';

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const bookInterview = (id, interview) => {
    console.log('id:', id);
    console.log('interview:', interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({ ...state, appointments });
  };

  const setDay = (day) => setState({ ...state, day });

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
      .catch((error) => console.error(error));
  }, []);

  const appt = dailyAppointments.map((appointment) => {
    const interviewer = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        // {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interviewer}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
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
