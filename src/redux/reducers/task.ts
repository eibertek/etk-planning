import { TaskProps } from "../../Models/Tasks";
import { TASKS_EDIT_TASK, TASKS_LIST_TASK, TASKS_NEW_TASK, NAVIGATION_CLEAN_STATE } from "../actions";


declare interface TaskState {
    tasks: Array<TaskProps>;
    isLoading: boolean;
}

export const initialTaskState = {
    tasks: [],
    editTask: {
        status: false,
        task: {},
    },    
    isLoading: false,
};

export interface ITodoAction {
    type: string;
    tasks: TaskState["tasks"];
    task: TaskProps;
    message:String;
};

export function tasksReducer(state: TaskState = initialTaskState, action: ITodoAction) {
    switch (action.type) {
        case TASKS_LIST_TASK.REQUESTED:
            return { ...state, loading: true, }
        case TASKS_LIST_TASK.COMPLETED:
            return { ...state, loading: false, tasks: action.tasks };
        case TASKS_LIST_TASK.FAILED:
            return { ...state, loading: false, tasks: [], message: action.message };
        case TASKS_NEW_TASK.REQUESTED:
            return { ...state, loading: true, }
        case TASKS_NEW_TASK.COMPLETED:
            return { ...state, loading: false, message: 'all set' };
        case TASKS_NEW_TASK.FAILED:
                return { ...state, loading: false, message: action.message };
        case TASKS_EDIT_TASK.REQUESTED:
            return { ...state, editTask: {status:true, task:action.task } }
        case TASKS_EDIT_TASK.COMPLETED:
            return { ...state, editTask: {status:false, task:{} }, message: 'all set' };
        case TASKS_EDIT_TASK.FAILED:
                return { ...state,  editTask: {status:false, task:{} }, message: action.message };    
        case NAVIGATION_CLEAN_STATE:
                return { ...state,  editTask: {status:false, task:{} }, message: '' };    
        default:
            return state
    }
}