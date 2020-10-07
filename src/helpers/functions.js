// Helper functions
const getDayFromAppointmentId = (state, appointment_id) =>
  state.days.find(({ appointments }) => appointments.includes(appointment_id));

const connectionToWebSocket = (dispatch) => {
  const wsURL = 'ws://localhost:8001/';
  const ws = new WebSocket(wsURL);

  ws.onopen = (evt) => {
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      dispatch(data);
    };
  };
};
export { getDayFromAppointmentId, connectionToWebSocket };
