import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
    createReactNavigationReduxMiddleware,
  } from 'react-navigation-redux-helpers';
import saga from './sagas';
import { tasksReducer } from './reducers/task';
import { configReducer } from './reducers/config';
import { TASKS_LIST_TASK, CONFIG_LOAD, CONFIG_SAVE } from './actions';

const initialStore = {
};

const appReducer = combineReducers({
  tasks: tasksReducer,
  config: configReducer,
});

const navMiddleware = createReactNavigationReduxMiddleware(
  (state:any) => state.nav,
);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(appReducer, initialStore, applyMiddleware(sagaMiddleware, navMiddleware));

sagaMiddleware.run(saga);

export const dispatch = store.dispatch;

store.dispatch({
  type: CONFIG_LOAD.REQUESTED,
});

store.dispatch({
    type: TASKS_LIST_TASK.REQUESTED,
});

// store.dispatch({
//   type: CONFIG_SAVE.REQUESTED,
//   config:{
//     sortingOptions: ['estimated'],
//     onTimeProps: {
//         color: '#99FF99',
//         limit: 30
//     },
//     warningProps: {
//         color: '#FFFF44',
//         limit: 20
//     },
//     delayedProps: {
//         color: '#FF4444',
//         limit: 10
//     },    
// }
// });

/**
 * {
        sortingOptions: ['estimated'],
        onTimeProps: {
            color: '#99FF99',
            limit: 30
        },
        warningProps: {
            color: '#FFFF44',
            limit: 20
        },
        delayedProps: {
            color: '#FF4444',
            limit: 10
        },    
    },
 */
