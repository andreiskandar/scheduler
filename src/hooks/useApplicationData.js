import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: {},
    interviewers: {},
  });

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
        return true;
      })
      .catch((error) => console.error(error));
  }, []);

  const getDay = (appt_id) => state.days.find(({ appointments }) => appointments.includes(appt_id));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    if (state.appointments[id].interview === null) {
      const foundDay = getDay(id);
      const mutateDays = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: --day.spots } : day));
      const newState = {
        ...state,
        mutateDays,
      };
      setState(newState);
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => {
        return { ...prev, appointments };
      });

      return true;
    });
  };

  const cancelInterview = (id, interview) => {
    const foundDay = getDay(id);
    const mutateDays = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: ++day.spots } : day));

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, mutateDays });
      return true;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
