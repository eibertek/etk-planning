
import React from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Button, Text, Input  } from 'react-native-elements';
import Task, { TaskProps } from '../../Models/Tasks';

interface Props {
    navigation: any;
};

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
    const onSave = () => {
        const newTask = new Task(task);
        newTask.save();
        props.navigation.goBack();
    };
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
            <Button title="Save" onPress={onSave} />
        </View>
    )
}

export default NewTask;
