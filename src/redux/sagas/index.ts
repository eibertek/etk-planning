import { takeLatest } from 'redux-saga/effects'
import { listTasks, saveTask } from "./tasks";
import { TASKS_LIST_TASK, TASKS_NEW_TASK } from '../reducers/task';


function* rootSaga() {
    yield takeLatest(TASKS_LIST_TASK.REQUESTED, listTasks);
    yield takeLatest(TASKS_NEW_TASK.REQUESTED, saveTask);
}

export default rootSaga;