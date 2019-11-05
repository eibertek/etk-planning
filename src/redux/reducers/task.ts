import { TaskProps } from "../../Models/Tasks";

export const actionCreator = (action: string) : {REQUESTED: string, COMPLETED: string, FAILED: string, } => 
   {
        return {
            REQUESTED: `${action}::Requested`,
            COMPLETED: `${action}::Completed`,
            FAILED: `${action}::Failed`,
       };
   };

export const TASKS_NEW_TASK = actionCreator('tasks::New Task');
export const TASKS_LIST_TASK = actionCreator('tasks::List Task');
export const TASKS_EDIT_TASK = actionCreator('tasks::Edit Task');
export const TASKS_GET_TASK = actionCreator('tasks::Get Task');
export const TASKS_REMOVE_TASK = actionCreator('tasks::Remove Task');

declare interface TaskState {
    tasks: Array<TaskProps>;
    isLoading: boolean;
}

const initialTaskState = {
    tasks: [],
    isLoading: false,
};

export interface ITodoAction {
    type: string;
    tasks: TaskState["tasks"];
    message:String;
};

export function tasksReducer(state: TaskState = initialTaskState, action: ITodoAction) {
    console.log(action);
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
        default:
            return state
    }
}