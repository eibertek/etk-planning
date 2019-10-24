
import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Task, { TaskProps } from '../../Models/Tasks';
import { StorageConnector } from '../../Models/driver';
import { ListItem } from 'react-native-elements';
import { styles } from '../../Styles';

interface Props {
    title?: string;
    queryData?: TaskProps;
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
        console.log('Loading tasks', tasks && tasks[0]);   
        Task.getAll().then(data => {
            console.log(data);
            setTasks(data);
        });
    }    
   // tasks.save(); 
    return (
        <View style={styles.taskList}>
            <Text>{props.title || 'Tasks List'}</Text>
                {tasks && tasks.map((task: TaskProps, i: number)=>{
                    return (
                        <ListItem
                            key={i}
                            title={task.name}
                            subtitle={task.description}
                            bottomDivider
                            rightElement={<Text>{task.status}</Text>}
                        />
                    ) 
                })}
        </View>
    )
}

export default TaskList;
