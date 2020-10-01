// const selectUserByName = (state, name) => {
//   const filteredNames = state.users.filter((user) => user.name === name);
//   return filteredNames;
// };

const getInterview = (state, interview) => {
  if (!interview) return null;
  else {
    interview.interviewer = state.interviewers[interview.interviewer];
    return interview;
  }
};

const getAppointmentsForDay = (state, day) => {
  const result =
    state.days.length === 0
      ? []
      : state.days.filter((entry) => entry.name === day).length === 0
      ? []
      : state.days.filter((entry) => entry.name === day)[0].appointments.map((apptNum) => state.appointments[apptNum]);

  return result;
};

export { getAppointmentsForDay, getInterview };
