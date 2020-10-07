import { useEffect, useReducer } from 'react';
import { getDayFromAppointmentId } from '../helpers/functions';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };

    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview,
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };

      let days = [...state.days];
      const foundDay = getDayFromAppointmentId(state, action.id);
      if (state.appointments[action.id].interview === null && action.interview !== null) {
        days = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: day.spots - 1 } : day));
      } else if (state.appointments[action.id].interview !== null && action.interview === null) {
        days = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: day.spots + 1 } : day));
      }

      return { ...state, appointments, days };
    }

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
};

const initialState = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {},
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setDay = (day) => dispatch({ type: 'SET_DAY', day });

  useEffect(() => {
    const apiDays = axios.get('/api/days');
    const apiAppointments = axios.get('/api/appointments');
    const apiInterviewers = axios.get('/api/interviewers');

    // //connection to websocket
    // const wsURL = 'ws://localhost:8001/';
    // const ws = new WebSocket(wsURL);

    // ws.onopen = (evt) => {
    //   ws.onmessage = (evt) => {
    //     const data = JSON.parse(evt.data);
    //     dispatch(data);
    //   };
    // };

    // ajax
    Promise.all([apiDays, apiAppointments, apiInterviewers])
      .then((response) => {
        const [days, appointments, interviewers] = response;
        dispatch({
          type: SET_APPLICATION_DATA,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        });
        return true;
      })
      .catch((error) => console.error(error));
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
      });

      return true;
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
      return true;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
