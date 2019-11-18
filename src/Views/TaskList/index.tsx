
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Alert } from 'react-native';
import Task, { TaskProps } from '../../Models/Tasks';
import { ListItem, ButtonGroup, Text } from 'react-native-elements';
import { styles } from '../../Styles';
import { Dispatch } from 'redux';
import { navigate, deleteTask as deleteTaskAction } from '../../redux/actions';
import { dispatch } from '../../redux';
import { ConfiguratorProps } from '../../Models/Configurator';

interface Props {
    title?: string;
    queryData?: TaskProps;
    tasks: Array<TaskProps>;
    gotoEdit: (task:TaskProps)=>{};
    config:ConfiguratorProps;
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

const TimeAlertStyle = (time: number, config: ConfiguratorProps) => {
    const onTimeConfig = config.onTimeProps || {color:'green', limit:60};
    const warningConfig = config.warningProps || {color:'yellow', limit:50};
    const delayedConfig = config.delayedProps || {color:'red', limit:10};    
    if(time<=delayedConfig.limit) return { backgroundColor: delayedConfig.color };
    if(time<=warningConfig.limit) return { backgroundColor: warningConfig.color };
    if(time<=onTimeConfig.limit) return { backgroundColor: onTimeConfig.color };
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
            <Text h1>{props.title || 'Tasks List'}</Text>
                {tasks && tasks.map((task: TaskProps, i: number)=>{
                    const taskModel = new Task(task);
                    return (
                        <ListItem
                        containerStyle={TimeAlertStyle(taskModel.isFinished(), props.config)}
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
    tasks: state.tasks.tasks,
    config: state.config.config,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    gotoEdit: (task:TaskProps) => dispatch(gotoEdit(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
