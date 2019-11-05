import { put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import Task, { TaskProps } from '../../Models/Tasks';
import { TASKS_LIST_TASK, TASKS_NEW_TASK } from '../reducers/task';
import { NavigatorInstance } from '../../index';

export function* listTasks(action: any) {
    try {
        const tasks = yield Task.getAll();
        yield put({ type: TASKS_LIST_TASK.COMPLETED, tasks });
    } catch (e) {
        yield put({ type: TASKS_LIST_TASK.FAILED, message: e.message });
    }
}

export function* saveTask(action: any) {
    try {
        const newTask = new Task(action.task);
        yield newTask.save();
        if(newTask.getErrors() !== "") throw new Error(newTask.getErrors());
        yield put({ type: TASKS_NEW_TASK.COMPLETED });
        yield put({ type: TASKS_LIST_TASK.REQUESTED });
        yield NavigatorInstance.dispatch(NavigationActions.back());
    } catch (e) {
        yield put({ type: TASKS_NEW_TASK.FAILED, message: e.message });
    }
}