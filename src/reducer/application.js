import { getDayFromAppointmentId } from '../helpers/functions';

export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

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

export default reducer;
