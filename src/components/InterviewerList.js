import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

const InterviewerList = (props) => {
  const { interviewers, setInterviewer } = props;

  const interviewerList = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
        // onClick={setInterviewer}
        setInterviewer={(event) => setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{interviewerList}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
