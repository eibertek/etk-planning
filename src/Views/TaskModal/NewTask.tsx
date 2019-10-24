
import React from 'react'
import { View, Alert, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Button, Text, Input  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import Task, { TaskProps } from '../../Models/Tasks';

interface Props {
    navigation: any;
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

    const [task, setTaskField] = React.useState({});
    const onSave = () => {
        console.log(task);
        const newTask = new Task(task);
        newTask.save().then(data=>{
            if(newTask.getErrors()==="") {
                Alert.alert('Task Saved!!');
                props.navigation.goBack();    
            }
        });
    };
    return (
        <View>
            <Text h1>New Task</Text>
            {Object.keys(taskProps).map((item:string) => {
                switch(item) {
                    case 'description':
                    case 'name':
                    case 'charge':
                        return  <Input
                        placeholder={item}
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
                        onDateChange={(date: string) => setTaskField({...task, [item]: date})}
                        />
                    case 'status':
                        return  <Picker
                        selectedValue={task.status}
                        style={{width:'auto', marginVertical:20, marginLeft:10, }}
                        onValueChange={(date: string) => setTaskField({...task, [item]: date})}>
                        <Picker.Item label="New" value="NEW" />
                        <Picker.Item label="In Progress" value="IN PROGRESS" />
                        <Picker.Item label="QA" value="QA" />
                        <Picker.Item label="Fixed" value="FIXED" />
                        <Picker.Item label="Finish" value="FINISH" />
                      </Picker>      
                }
            }
            )}
            <Button title="Save" onPress={onSave} />
        </View>
    )
}

export default NewTask;
