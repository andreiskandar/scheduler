import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getByPlaceholderText,
  getByAltText,
  getAllByTestId,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

// describe('Application', () => {
// it('defaults to Monday and changes the schedule when a new day is selected', () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText('Monday')).then(() => {
//     fireEvent.click(getByText('Tuesday'));
//     expect(getByText('Leopold Silvers')).toBeInTheDocument();
//   });
// });

it('changes the schedule when a new day is selected', async () => {
  const { getByText, container } = render(<Application />);
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
  const input = getByPlaceholderText(appointment, 'Enter Student Name');
  fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

  // 5. Click the first interviewer in the list
  fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

  // 6. Click the 'Save' button on that same appointment
  fireEvent.click(getByText(appointment, 'Save'));

  // 7. Check that the element with the text 'Saving' is displayed
  await waitForElement(() => getByText(container, 'Saving'));

  // 8. Wait until the element with the text 'Lydia Miller-Jones' is displayed
  await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

  // 9. Check that the DayListItem with the text 'Monday' also has the text 'no spots remaining'
  const dayListItemMonday = getAllByTestId(container, 'dayListItem')[0];
  expect(getByText(dayListItemMonday, 'no spots remaining'));
});
// });
