import { put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ConfiguratorModel from '../../Models/Configurator';
import { CONFIG_LOAD, CONFIG_SAVE } from '../actions';
import { NavigatorInstance } from '../types';

export function* loadConfiguration(action: any) {
    try {
        const config = yield ConfiguratorModel.getAll();
        yield put({ type: CONFIG_LOAD.COMPLETED, config });
//        yield put({ type: NAVIGATION_CLEAN_STATE });
    } catch (e) {
        console.log(' get Config Error', e);        
        yield put({ type: CONFIG_LOAD.FAILED, message: e.message });
    }
}

export function* saveConfigurator(action: any) {
    try {
//        const configuration = yield select((state)=>state.config);
        const newConfig = new ConfiguratorModel(action.config);
        yield newConfig.save();
        if(newConfig.getErrors() !== "") throw new Error(newConfig.getErrors());
        yield put({ type: CONFIG_SAVE.COMPLETED });
        yield put({ type: CONFIG_LOAD.REQUESTED });
        yield NavigatorInstance.dispatch(NavigationActions.back());
    } catch (e) {
        console.log(' get Config Save Error', e);        
        yield put({ type: CONFIG_SAVE.FAILED, message: e.message });
    }
}
