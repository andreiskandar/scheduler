import { useEffect, useReducer } from 'react';
import { connectionToWebSocket } from '../helpers/functions';
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from '../reducer/application';
import axios from 'axios';

const initialState = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {},
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const apiDays = axios.get('/api/days');
    const apiAppointments = axios.get('/api/appointments');
    const apiInterviewers = axios.get('/api/interviewers');

    //connection to websocket
    connectionToWebSocket(dispatch);

    // Ajax request
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
