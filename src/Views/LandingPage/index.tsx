import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { styles } from '../../Styles';
import TaskList from '../TaskList';
import { Icon, Button } from 'react-native-elements';

export interface Props {
    name: string;
    navigation: any;
  }

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
              icon={<Icon name="assignment" size={40} />}
            ></Button>            
            <Button
              buttonStyle={styles.buttonRounded}
              onPress={() => props.navigation.push('NewTask')}
              icon={<Icon name="add-circle" size={40} />}
            >
            </Button>
        </View>
      </>                            
    )
}

export default index;
