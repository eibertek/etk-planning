// import { NavigationActions } from "react-navigation";
import { TaskProps } from "../../Models/Tasks/Task";
import { ConfiguratorProps } from "../../Models/Configurator/Configurator";

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

export const CONFIG_LOAD = actionCreator('configartor::load');
export const CONFIG_SAVE = actionCreator('configurator::save');

export const NAVIGATION_GO_TO_EDIT = 'Navigation to';
export const NAVIGATION_GO_TO = 'Navigation:: go to';
export const NAVIGATION_CLEAN_STATE = 'Navigation:: clean state';

export const onSave = (task: TaskProps) => ({
    type: TASKS_NEW_TASK.REQUESTED,
    task,
   });

export const deleteTask = (task: TaskProps) => ({
    type: TASKS_REMOVE_TASK.REQUESTED,
    task,
   });

export const navigate = (params: any) => {
    return {
        type: NAVIGATION_GO_TO,
        params,
    }
}   

export const onConfigSave = (config: ConfiguratorProps) => ({
    type: CONFIG_SAVE.REQUESTED,
    config,
   });
