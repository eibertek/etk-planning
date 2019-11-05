
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import { TaskProps } from '../../Models/Tasks';
import { ListItem, ButtonGroup } from 'react-native-elements';
import { styles } from '../../Styles';

interface Props {
    title?: string;
    queryData?: TaskProps;
    tasks: Array<TaskProps>;
};

const MenuElement:React.FunctionComponent<TaskProps> = (props:TaskProps) => {
        return (
            <View style={{ flex:1, flexDirection:'column', alignItems:'center'}}>
                <Text>{props.status || 'NEW'}</Text>
                <ButtonGroup 
                    onPress={()=>{}}
                    selectedIndex={0}
                    buttons={['edit', 'del']}
                    containerStyle={{height: 100, width:100}}                
                />
            </View>
        )
};

const TaskList: React.FunctionComponent<Props> = (props:Props) => {
    const tasks = props.tasks;
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
                            rightElement={<MenuElement {...task} />}
                        />
                    ) 
                })}
        </View>
    )
}

const mapStateToProps = (state: any) => ({
    tasks: state.tasks.tasks
});

export default connect(mapStateToProps)(TaskList);
