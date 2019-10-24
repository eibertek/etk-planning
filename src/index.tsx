import React from 'react';
import { View, Image, Text, BackHandler } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ThemeProvider, Button } from 'react-native-elements';
import LandingPage from './Views/LandingPage';
import NewTask from './Views/TaskModal/NewTask';
import TaskList from './Views/TaskList';
import { styles } from './Styles';

interface Props {
    navigation: any;
}
class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <Image
      source={require('./images/ic_launcher.png')}
      style={styles.logo} >
      </Image>
      <Text style={styles.logoText} >Etk Planning</Text>
      <Button 
          onPress={BackHandler.exitApp} 
          title="exit"
          buttonStyle={styles.exitButton}
          ></Button>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  LandingPage: {
    screen: LandingPage,
  },
  NewTask: {
    screen: NewTask,
  },
  EditTask: {
    screen: NewTask,
  },
  ViewTask: {
    screen: TaskList,
  }, 
},
{
  defaultNavigationOptions: {
    headerTitle:(props)=><LogoTitle {...props}/>,
  },
  navigationOptions: {
    tabBarLabel: 'Home!',
  },
});

const AppNavigation = createAppContainer(AppNavigator);
const App = () => <>
      <ThemeProvider>
        <AppNavigation />
    </ThemeProvider>
</>
export default App;