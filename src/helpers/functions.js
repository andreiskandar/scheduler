// Helper functions
const getDayFromAppointmentId = (state, appointment_id) =>
  state.days.find(({ appointments }) => appointments.includes(appointment_id));

export { getDayFromAppointmentId };
