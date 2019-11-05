import React from 'react'
import { View, Text, ImageBackground, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StorageConnector } from '../../Models/driver';
import { styles } from '../../Styles';
import TaskList from '../TaskList';

export interface Props {
    name: string;
    navigation: any;
  }
   // StorageConnector.Purge();    

const alert = () => Alert.alert('Purge Button on production', 
            'Delete every task you made?', 
            [
              { text:'Hell NO!', onPress:()=>{}},
              { text:'Sure, why not...', onPress:()=>StorageConnector.Purge()}, 
            ]
          );

const index: React.FunctionComponent<Props> = (props:Props) => {
    return (
      <>
        <View style={styles.body}>
              <TaskList title="Last Tasks" />
        </View>
        <View style={styles.menuButton} >
        <Button
              buttonStyle={styles.buttonRounded}
              onPress={() => props.navigation.push('ViewTask')}
              icon={<Icon name="list" size={40} />}
            ></Button>            
            <Button
              buttonStyle={styles.buttonRounded}
              onPress={() => props.navigation.push('NewTask')}
              icon={<Icon name="plus-circle" size={40} />}
            >
            </Button>
            <Button
              buttonStyle={styles.buttonRounded}
              onPress={alert}
              icon={<Icon name="bug" size={40} />}
            >
            </Button>
        </View>
      </>                            
    )
}

export default index;
