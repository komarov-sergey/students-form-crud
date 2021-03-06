import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

import {
  deleteStudentAction,
  updateStudentAction
} from 'store/student/actions';
import c from 'utils/constants';
import { IStudent } from 'store/student/types';

type Props = {
  student: IStudent;
  deleteStudentAction: (id: string) => void;
  updateStudentAction: (student: IStudent) => void;
};

const FCStudentItem: React.FC<Props> = ({ student, ...props }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(c.initial);
  const { fio, birthday, assessments } = student;
  const refs = {
    fio: useRef(null),
    birthday: useRef(null),
    assessments: useRef(null)
  };

  const deleteStudent = () => {
    const { id } = student;
    props.deleteStudentAction(id);
  };

  const editStudent = () => {
    setIsEdit(!isEdit);
  };

  const updateStudent = () => {
    setIsEdit(!isEdit);
    props.updateStudentAction({
      id: student.id,
      fio: refs.fio.current.value,
      birthday: refs.birthday.current.value,
      assessments: refs.assessments.current.value
    });
  };

  const handleChange = e => setValue(e.target.value);

  return isEdit ? (
    <tr>
      <td>
        <input ref={refs.fio} defaultValue={fio} />
      </td>
      <td>
        <input ref={refs.birthday} defaultValue={birthday} />
      </td>
      <td>
        <select
          ref={refs.assessments}
          value={value}
          onChange={handleChange}
          defaultValue={c.initial}
        >
          <option value={c.initial}>{c.initial}</option>
          <option value={c.excellent}>{c.excellent}</option>
          <option value={c.good}>{c.good}</option>
          <option value={c.satisfactorily}>{c.satisfactorily}</option>
          <option value={c.bad}>{c.bad}</option>
        </select>
      </td>
      <td>
        <button onClick={updateStudent}>Save</button>
      </td>
      <td>
        <button onClick={editStudent}>Cancel</button>
      </td>
    </tr>
  ) : (
    <tr>
      <td>{fio}</td>
      <td>{birthday}</td>
      <td>{assessments}</td>
      <td>
        <button onClick={editStudent}>Edit</button>
      </td>
      <td>
        <button onClick={deleteStudent}>Del</button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: any) => {
  return bindActionCreators(
    {
      deleteStudentAction,
      updateStudentAction
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(FCStudentItem);
