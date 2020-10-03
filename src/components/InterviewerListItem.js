import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames({
    interviewers__item: true,
    'interviewers__item--selected': selected,
    'interviewers__item-image': avatar,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
