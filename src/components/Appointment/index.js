import React from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import 'components/Appointment/styles.scss';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = 'Saving';
const DELETE = 'Deleting';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const cancel = () => {
    transition(DELETE);
    props
      .cancelInterview(props.id, null)
      .then(() => {
        transition(EMPTY);
        return true;
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true));
  };
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && <Error message={'Could not delete appointment'} onClose={() => back()} />}
      {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={() => back()} />}
      {mode === SAVE && <Status message={SAVE} />}
      {mode === DELETE && <Status message={DELETE} />}
      {mode === CONFIRM && (
        <Confirm message={'Are you sure you would like to delete?'} onCancel={() => back()} onConfirm={cancel} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {/* {props.interview ? (
        <Show student={props.interview.student} interviewer={props.interview.interviewer} />
      ) : (
        <Empty />
      )} */}
    </article>
  );
};

export default Appointment;
