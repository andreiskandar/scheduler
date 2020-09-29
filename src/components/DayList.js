import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const { days, day, setDay } = props;
  const list = props.days.map((entry) => {
    return <DayListItem name={entry.name} spots={entry.spots} selected={entry.name === day} setDay={props.setDay} />;
  });

  return <ul>{list}</ul>;
};

export default DayList;
