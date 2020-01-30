import {
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT
} from 'actions/actionTypes';

export function addStudentAction(student) {
  return {
    type: ADD_STUDENT,
    payload: student
  };
}

export function deleteStudentAction(id) {
  return {
    type: DELETE_STUDENT,
    payload: id
  };
}

export function updateStudentAction(student) {
  return {
    type: UPDATE_STUDENT,
    payload: student
  };
}
