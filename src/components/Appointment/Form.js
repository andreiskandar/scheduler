import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = (props) => {
  const [student, setStudent] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
  };
  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={student}
            onInput={(event) => setStudent(event.target.value)}
            /*
            This must be a controlled component
            */
          />
        </form>
        <h4 className='text--light'>Interviewer</h4>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
