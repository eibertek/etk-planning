import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ThemeProvider } from 'react-native-elements';
import LandingPage from './Views/LandingPage';
import NewTask from './Views/TaskModal/NewTask';
import TaskList from './Views/TaskList';

interface Props {
    navigation: any;
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
});

const AppNavigation = createAppContainer(AppNavigator);
const App = () => <>
      <ThemeProvider>
        <AppNavigation />
    </ThemeProvider>
</>
export default App;