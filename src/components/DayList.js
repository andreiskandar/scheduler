import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const list = props.days.map((entry) => {
    return (
      <DayListItem
        key={entry.id}
        name={entry.name}
        spots={entry.spots}
        selected={entry.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{list}</ul>;
};

export default DayList;
