import React from 'react';
import { View, Image, Text, BackHandler } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { ThemeProvider, Button } from 'react-native-elements';
import { Provider, connect } from 'react-redux'; 
import LandingPage from './Views/LandingPage';
import NewTask from './Views/TaskModal/NewTask';
import TaskList from './Views/TaskList';
import { styles } from './Styles';
import { store } from './redux';
import { createAppContainer } from 'react-navigation';

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

export const AppNavigator = createStackNavigator({
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

const mapStateToProps = (state: any) => ({
  state: state.nav,
});

// const AppWithNavigationState = connect(mapStateToProps)(AppWithReduxNavigation);
const AppNavigation = createAppContainer(AppNavigator);

export const NavigatorInstance = {
  dispatch:(action: any)=>{},
};

class App extends React.Component {
  navigation: any;
  componentDidMount() {
    console.log(this.navigation);
    NavigatorInstance.dispatch = this.navigation.dispatch;
  }

  render = () => {
    return (
    <>
      <Provider store={store}>
        <ThemeProvider>
            <AppNavigation ref={(nav) => this.navigation = nav} />
        </ThemeProvider>
      </Provider>
    </>
    );
  }
}

export default App;