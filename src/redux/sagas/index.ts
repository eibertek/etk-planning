import { takeLatest } from 'redux-saga/effects'
import { listTasks, saveTask, navigate, removeTask } from "./tasks";
import { TASKS_LIST_TASK, TASKS_NEW_TASK, NAVIGATION_GO_TO, TASKS_REMOVE_TASK, CONFIG_LOAD, CONFIG_SAVE } from '../actions';
import { loadConfiguration, saveConfigurator } from './configurator';


function* rootSaga() {
    yield takeLatest(TASKS_LIST_TASK.REQUESTED, listTasks);
    yield takeLatest(TASKS_NEW_TASK.REQUESTED, saveTask);
    yield takeLatest(CONFIG_LOAD.REQUESTED, loadConfiguration);
    yield takeLatest(CONFIG_SAVE.REQUESTED, saveConfigurator);    
 //   yield takeLatest(NAVIGATION_GO_TO_EDIT, navigate);
    yield takeLatest(NAVIGATION_GO_TO, navigate);
    yield takeLatest(TASKS_REMOVE_TASK.REQUESTED, removeTask);
}

export default rootSaga;