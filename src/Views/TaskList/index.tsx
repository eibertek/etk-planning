
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Alert } from 'react-native';
import Task, { TaskProps } from '../../Models/Tasks';
import { ListItem, ButtonGroup } from 'react-native-elements';
import { styles } from '../../Styles';
import { Dispatch } from 'redux';
import { navigate, deleteTask as deleteTaskAction } from '../../redux/actions';
import { dispatch } from '../../redux';

interface Props {
    title?: string;
    queryData?: TaskProps;
    tasks: Array<TaskProps>;
    gotoEdit: (task:TaskProps)=>{};
};

const gotoEdit = (task: TaskProps) => navigate({routeName:'NewTask', task, extra:'edit'});

const deleteTask = (task: TaskProps) => {
    Alert.alert('Delete Task', 
    'Delete this task?', 
    [
      { text:'No', onPress:()=>{}},
      { text:'Yes', onPress:()=>{
            return dispatch(deleteTaskAction(task));
      }}, 
    ]
  );    
};

const TimeAlertStyle = (time: number) => {
    if(time<=20) return { backgroundColor: 'red' };
    if(time<=60) return { backgroundColor: 'yellow' };
    if(time<=200) return { backgroundColor: 'green' };
    return { backgroundColor: 'gray' };
};

const MenuElement:React.FunctionComponent<TaskProps> = (props:TaskProps) => {
        return (
            <View style={{flex:1, flexDirection:'column', alignItems:'center',}}>
                <Text>{props.task.status || 'NEW'}</Text>
                <ButtonGroup 
                    buttons={['edit', 'del']}
                    selectedIndex={props.index}
                    onPress={(buttonIndex: number)=>{
                        switch(buttonIndex) {
                            case 0:
                                return props.gotoEdit(props.task);
                            case 1:
                                return deleteTask(props.task);
                            default:
                                return;        
                        }
                    }}
                    containerStyle={{height: 60, width:100}}                
                />
            </View>
        )
};

const TaskList: React.FunctionComponent<Props> = (props:Props) => {
    const tasks = props.tasks;
    return (
        <ScrollView  style={styles.taskList}>
            <Text>{props.title || 'Tasks List'}</Text>
                {tasks && tasks.map((task: TaskProps, i: number)=>{
                    const taskModel = new Task(task);
                    return (
                        <ListItem
                        containerStyle={TimeAlertStyle(taskModel.isFinished())}
                            key={i}
                            title={task.name}
                            subtitle={task.description}
                            bottomDivider
                            onPress={()=>props.gotoEdit(task)}
                            rightElement={<MenuElement task={task} index={i} gotoEdit={props.gotoEdit} />}
                        />
                    ) 
                })}
        </ScrollView >
    )
}

const mapStateToProps = (state: any) => ({
    tasks: state.tasks.tasks
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    gotoEdit: (task:TaskProps) => dispatch(gotoEdit(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
