import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
   // createReduxContainer,
    createReactNavigationReduxMiddleware,
   //  createNavigationReducer,
  } from 'react-navigation-redux-helpers';
import saga from './sagas';
import { tasksReducer } from './reducers/task';
import { TASKS_LIST_TASK } from './actions';

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

sagaMiddleware.run(saga);

export const dispatch = store.dispatch;

store.dispatch({
    type: TASKS_LIST_TASK.REQUESTED,
});

// export const AppWithReduxNavigation = createReduxContainer(AppNavigator);
