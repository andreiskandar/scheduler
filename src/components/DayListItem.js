import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

const DayListItem = (props) => {
  const formatSpots = props.spots === 0 ? 'no spots' : props.spots === 1 ? '1 spot' : `${props.spots} spots`;

  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid='day'>
      <h2 className='text--regular'>{props.name}</h2>
      <h2 className='text--light'>{formatSpots} remaining</h2>
    </li>
  );
};

export default DayListItem;
