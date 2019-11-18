import { ConfiguratorProps } from "../../Models/Configurator";
import { CONFIG_LOAD, CONFIG_SAVE } from "../actions";

declare interface ConfigState {
    config: ConfiguratorProps;
    isLoading: boolean;
}

export const initialConfigState:ConfigState = {
    config: {
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
    isLoading: false,
};

export interface ITodoAction {
    type: string;
    config: ConfiguratorProps;
    message:String;
};

export function configReducer(state: ConfigState = initialConfigState, action: ITodoAction) {
    switch (action.type) {
        case CONFIG_LOAD.REQUESTED:
            return { ...state, loading: true, }
        case CONFIG_LOAD.COMPLETED:
            return { ...state, loading: false, config: action.config };
        case CONFIG_LOAD.FAILED:
            return { ...state, loading: false, config:{}, message: action.message };
        case CONFIG_SAVE.REQUESTED:
            return { ...state, loading: true, }
        case CONFIG_SAVE.COMPLETED:
            return { ...state, loading: false, message: 'all set' };
        case CONFIG_SAVE.FAILED:
                return { ...state, loading: false, message: action.message };
        default:
            return state
    }
}