import React from 'react';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import 'components/Appointment/styles.scss';

const Appointment = (props) => {
  return (
    <article className='appointment'>
      {props.time}
      <Empty />
      <Show />
    </article>
  );
};

export default Appointment;
