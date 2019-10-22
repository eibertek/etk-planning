import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './Views/LandingPage';
import NewTask from './Views/TaskModal/';
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

export default createAppContainer(AppNavigator);