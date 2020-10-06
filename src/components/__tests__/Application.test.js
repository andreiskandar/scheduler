import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('renders without crashing', () => {
    render(<Application />);
  });

  it('renders without crashing', () => {
    render(<Application />);
  });
});
