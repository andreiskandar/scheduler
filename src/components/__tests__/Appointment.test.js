import React from 'react';

import { render, screen } from '@testing-library/react';

import Appointment from '../Appointment/index';

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
});
