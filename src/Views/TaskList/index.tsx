
import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Task, { TaskProps } from '../../Models/Tasks';

interface Props {
    title: string;
    queryData: TaskProps;
};

const TaskList: React.FunctionComponent<Props> = (props:Props) => {
    const newTaskProps: TaskProps = {
        //   id: 863444.5801060748,
        id: 911872.0679615744,
        parentId: 0,
        sprintId: [],
        name: 'Mariano Test 3',
        description: 'this task is old',
        estimated: moment(),
        charge: 0,
        status: 'IN PROGRESS',
    };
    // const task = new Task(newTaskProps); 
    // StorageConnector.Purge();    
    const [tasks, setTasks] = React.useState();
    if(!tasks) {
        Task.getAll().then(data => setTasks(data));
    }    
   // tasks.save();    
    return (
        <View>
            <Text>Task List</Text>
            <Text>{tasks && tasks.length}</Text>
            <View>
                {tasks && tasks.map((task: TaskProps)=>{
                    return (
                    <>
                        <Text>{task.get('name')}</Text>
                        <Text>{task.get('status')}</Text>
                    </>
                    ) 
                })}
            </View>
        </View>
    )
}

export default TaskList;
