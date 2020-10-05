import { useEffect, useReducer } from 'react';
import { getDayIdFromAppointmentId, getRemainingSpotsForDay } from '../helpers/functions';
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
        interview: action.interview === null ? null : { ...action.interview },
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };

      const getDay = (appt_id) => state.days.find(({ appointments }) => appointments.includes(appt_id));

      let days;
      if (state.appointments[action.id].interview === null) {
        const foundDay = getDayIdFromAppointmentId(state, action.id);
        const remainingSpots = getRemainingSpotsForDay(foundDay, state);
        console.log('remainingSpots:', remainingSpots);
        days = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: --day.spots } : day));
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

  // const [state, setState] = useState({
  //   days: [],
  //   day: 'Monday',
  //   appointments: {},
  //   interviewers: {},
  // });

  // const setDay = (day) => setState({ ...state, day });
  const setDay = (day) => dispatch({ type: 'SET_DAY', day });

  useEffect(() => {
    const apiDays = axios.get('/api/days');
    const apiAppointments = axios.get('api/appointments');
    const apiInterviewers = axios.get('api/interviewers');

    Promise.all([apiDays, apiAppointments, apiInterviewers])
      .then((response) => {
        const [days, appointments, interviewers] = response;
        dispatch({
          type: SET_APPLICATION_DATA,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        });
        // setState((prev) => ({
        //   ...prev,
        //   days: days.data,
        //   appointments: appointments.data,
        //   interviewers: interviewers.data,
        // }));
        return true;
      })
      .catch((error) => console.error(error));
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // if (state.appointments[id].interview === null) {
    //   const foundDay = getDay(id);
    //   const mutateDays = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: --day.spots } : day));
    // const newState = {
    //   ...state,
    //   mutateDays,
    // };
    // setState(newState);
    // }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
        //mutateDays
      });

      // setState((prev) => {
      //   return { ...prev, appointments };
      // });

      return true;
    });
  };

  const cancelInterview = (id, interview) => {
    const foundDay = getDayIdFromAppointmentId(id);
    const mutateDays = state.days.map((day) => (day.id === foundDay.id ? { ...day, spots: ++day.spots } : day));

    const cancelAppointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: cancelAppointment,
    };

    return axios.delete(`api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
      // setState({ ...state, appointments, mutateDays });
      return true;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
