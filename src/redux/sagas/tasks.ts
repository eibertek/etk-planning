import { put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import Task, { TaskProps } from '../../Models/Tasks';
import { TASKS_LIST_TASK, TASKS_NEW_TASK, TASKS_EDIT_TASK, NAVIGATION_CLEAN_STATE, TASKS_REMOVE_TASK } from '../actions';
import { NavigatorInstance } from '../../index';

export function* listTasks(action: any) {
    try {
        const tasks = yield Task.getAll();
        yield put({ type: TASKS_LIST_TASK.COMPLETED, tasks });
        yield put({ type: NAVIGATION_CLEAN_STATE });
    } catch (e) {
        yield put({ type: TASKS_LIST_TASK.FAILED, message: e.message });
    }
}

export function* saveTask(action: any) {
    try {
        const editTask = yield select((state)=>state.tasks.editTask);
        const newTask = new Task(action.task);
        if(editTask.status) {
            yield newTask.load();
        }
        yield newTask.save();
        if(newTask.getErrors() !== "") throw new Error(newTask.getErrors());
        if(editTask.status) {
            yield put({ type: TASKS_EDIT_TASK.COMPLETED });
        }else{
            yield put({ type: TASKS_NEW_TASK.COMPLETED });
        }
        yield put({ type: TASKS_LIST_TASK.REQUESTED });
        yield NavigatorInstance.dispatch(NavigationActions.back());
    } catch (e) {
        yield put({ type: TASKS_NEW_TASK.FAILED, message: e.message });
    }
}

export function* navigate(action: any) {
    const {routeName, extra, task } = action.params;
    switch (extra) {
        case 'edit':
            yield put({ type: TASKS_EDIT_TASK.REQUESTED, task });
            break;    
        default:
            yield put({ type: NAVIGATION_CLEAN_STATE });
            break;
    }
    yield NavigatorInstance.dispatch(NavigationActions.navigate({routeName}));
}

export function* removeTask(action:any) {
    try{
        const task = new Task(action.task);
        yield task.load();
        yield task.delete();
        yield put({ type: TASKS_REMOVE_TASK.COMPLETED, message: task.getErrors() });
        yield put({ type: TASKS_LIST_TASK.REQUESTED });
    }catch (e) {
        yield put({ type: TASKS_REMOVE_TASK.FAILED, message: e.message });
    }
}