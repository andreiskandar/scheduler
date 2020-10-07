import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getByPlaceholderText,
  getByAltText,
  getAllByTestId,
  queryByText,
  queryByAltText,
  getByDisplayValue,
} from '@testing-library/react';

import Application from 'components/Application';
import axios from 'axios';

afterEach(cleanup);

describe('Application', () => {
  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText('Monday'));
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    // 1. render Application
    const { container } = render(<Application />);

    // 2. Wait until text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    // 3. Click the 'Add' button on the first empty appointment
    fireEvent.click(getByAltText(appointment, 'Add'));

    // 4. Enter the name 'Lydia Miller-Jones' into the input with the placeholder "Enter Student Name"
    const input = getByPlaceholderText(appointment, /enter student name/i);
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

    // 5. Click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // 6. Click the 'Save' button on that same appointment
    fireEvent.click(getByText(appointment, 'Save'));

    // 7. Check that the element with the text 'Saving' is displayed
    expect(getByText(container, 'Saving')).toBeInTheDocument();

    // 8. Wait until the element with the text 'Lydia Miller-Jones' is displayed
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    // 9. Check that the DayListItem with the text 'Monday' also has the text 'no spots remaining'
    const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // console.log('container:', prettyDOM(container));

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find((appt) => queryByText(appt, 'Archie Cohen'));
    fireEvent.click(getByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(queryByText(appointment, 'Deleting')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
    expect(getByText(container, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // 1. render application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find((appt) => queryByText(appt, 'Archie Cohen'));
    fireEvent.click(getByAltText(appointment, 'Edit'));

    // 4. Enter the name 'Lydia Miller-Jones' into the input with the placeholder "Enter Student Name"
    const input = getByDisplayValue(appointment, /archie cohen/i);
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

    // 5. Click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // 6. Click the 'Save' button on that same appointment
    fireEvent.click(getByText(appointment, 'Save'));

    // 7. Check that the element with the text 'Saving' is displayed
    expect(getByText(container, 'Saving')).toBeInTheDocument();

    // 8. Wait until the element with the text 'Lydia Miller-Jones' is displayed
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    // 9. Check that the DayListItem with the text 'Monday' also has the text 'no spots remaining'
    const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    // 1. render Application
    const { container, debug } = render(<Application />);

    // 2. Wait until text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];

    // 3. Click the 'Add' button on the first empty appointment
    fireEvent.click(getByAltText(appointment, 'Add'));

    // 4. Enter the name 'Lydia Miller-Jones' into the input with the placeholder "Enter Student Name"
    const input = getByPlaceholderText(appointment, /enter student name/i);
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

    // 5. Click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // 6. Click the 'Save' button on that same appointment
    fireEvent.click(getByText(appointment, 'Save'));

    // 7. Check that the element with the text 'Saving' is displayed
    expect(getByText(container, 'Saving')).toBeInTheDocument();

    // 8. Check if Error message is displayed
    await waitForElement(() => getByText(appointment, 'Could not save appointment'));
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. render Application
    const { container, debug } = render(<Application />);

    // 2. Wait until text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find((appt) => queryByText(appt, 'Archie Cohen'));
    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // 8. Check if Error message is displayed
    await waitForElement(() => queryByText(appointment, 'Could not delete appointment'));
  });
});
