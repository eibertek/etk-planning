
import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Task, { TaskProps } from '../../Models/Tasks';


interface Props {};

const TaskList: React.FunctionComponent<Props> = (props:Props) => {
    const newTaskProps: TaskProps = {
        //   id: 863444.5801060748,
   //     id: 911872.0679615744,
        parentId: 0,
        sprintId: [],
        name: '',
        description: 'this task is old',
        estimated: moment(),
        charge: 0,
        status: 'NEW',
    };
    const tasks = new Task(newTaskProps);
    console.log(Task.getAll(), tasks.props);
    tasks.save();    
    return (
        <View>
            <Text>Task List</Text>
        </View>
    )
}

export default TaskList;
