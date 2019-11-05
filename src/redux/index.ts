import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
   // createReduxContainer,
    createReactNavigationReduxMiddleware,
   //  createNavigationReducer,
  } from 'react-navigation-redux-helpers';
import saga from './sagas';
import { tasksReducer, TASKS_LIST_TASK } from './reducers/task';
// import { AppNavigator } from '../index';

const initialStore = {
};

// const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
//  nav: navReducer,
  tasks: tasksReducer,
});

const navMiddleware = createReactNavigationReduxMiddleware(
  (state:any) => state.nav,
);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(appReducer, initialStore, applyMiddleware(sagaMiddleware, navMiddleware));

sagaMiddleware.run(saga)

store.dispatch({
    type: TASKS_LIST_TASK.REQUESTED,
});

// export const AppWithReduxNavigation = createReduxContainer(AppNavigator);
