
import React from 'react'
import { View, NativeSyntheticEvent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Button, Text, Input  } from 'react-native-elements';
import Task, { TaskProps } from '../../Models/Tasks';

interface Props {};
const taskProps: TaskProps = {
    charge:0,
    description:'',
    estimated:moment(''),
//    id:0,
    name:'',
    parentId:0,
    status:'NEW',
}
const NewTask: React.FunctionComponent<Props> = (props:Props) => {

    const [task, setTaskField] = React.useState({});
    console.log(task);

    return (
        <View>
            <Text h1>New Task</Text>
            {Object.keys(taskProps).map((item:string) => (
                <Input
                placeholder={item}
                onChangeText={(text) => setTaskField({...task, [item]: text})}
                leftIcon={
                    <Icon
                      name='user'
                      size={24}
                      color='black'
                    />
                  }
                />
            )
            )}
            <Button title="Save" />
        </View>
    )
}

export default NewTask;
