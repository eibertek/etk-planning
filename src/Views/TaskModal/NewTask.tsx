
import React from 'react'
import { View, Alert, Picker } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment, { Moment } from 'moment';
import { Button, Text, Input  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import { TaskProps } from '../../Models/Tasks';
import { Status } from '../../Models/Tasks/Task';
import { onSave } from '../../redux/actions';

interface Props {
    navigation: any;
    task?: TaskProps;
    onSave: (task:TaskProps) => void;
    loading?: boolean;
    message?: string;
};

const taskProps: TaskProps = {
    name:'',    
    description:'',
    charge:0,    
    estimated:moment(''),
//    id:0,
    parentId:0,
    status:'NEW',
}
const NewTask: React.FunctionComponent<Props> = (props:Props) => {

    const [task, setTaskField] = React.useState(props.task || {});
    if(props.loading) return <><Text>Loading....</Text></>;
    return (
        <View>
            <Text h1>New Task</Text>
            {props.message !=='' && <Text>{props.message}</Text>}
            {Object.keys(taskProps).map((item:string) => {
                const defaultValue = props.task && props.task[item] ? props.task[item] : '';                 
                switch(item) {
                    case 'description':
                            return  <Input
                            placeholder={item}
                            defaultValue={defaultValue}
                            onChangeText={(text) => setTaskField({...task, [item]: text})}
                           // containerStyle={{height:200}}
                            multiline
                            leftIcon={
                                <Icon
                                  name='angle-right'
                                  size={24}
                                  color='black'
                                />
                              }
                            />                          
                    case 'name':
                    case 'charge':
                        return  <Input
                        placeholder={item}
                        defaultValue={defaultValue}
                        onChangeText={(text) => setTaskField({...task, [item]: text})}
                        leftIcon={
                            <Icon
                              name='angle-right'
                              size={24}
                              color='black'
                            />
                          }
                        />        
                    case 'estimated':
                        return <DatePicker 
                        placeholder="select date"
                        date={task.estimated}
                        style={{width:'auto', marginVertical:20, marginLeft:10, }}
                        mode="datetime"
                        onDateChange={(date: string) => setTaskField({...task, [item]: moment(date)})}
                        />
                    case 'status':
                        return  <Picker
                        selectedValue={task.status}
                        style={{width:'auto', marginVertical:20, marginLeft:10, }}
                        onValueChange={(status: Status) => setTaskField({...task, [item]: status})}>
                        <Picker.Item label="New" value="NEW" />
                        <Picker.Item label="In Progress" value="IN PROGRESS" />
                        <Picker.Item label="QA" value="QA" />
                        <Picker.Item label="Fixed" value="FIXED" />
                        <Picker.Item label="Finish" value="FINISH" />
                      </Picker>      
                }
            }
            )}
            <Button title="Save" onPress={() => props.onSave(task)} />
        </View>
    )
}


const mapStateToProps = (state: any) => ({
    loading: state.tasks.loading,
    message: state.tasks.message,
    task: state.tasks.editTask.task,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSave: (task: TaskProps) => dispatch(onSave(task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);

