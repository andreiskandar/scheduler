import React from 'react';
import 'components/DayListItem.scss';

const DayListItem = (props) => {
  const { name, spots, selected, setDay } = props;
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h2 className='text--light'>{props.spots} spots remaining</h2>
    </li>
  );
};

export default DayListItem;
