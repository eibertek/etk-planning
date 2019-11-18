import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { styles } from './styles';
import { SortingElement } from './SortingElement';
import ThresholdPicker from './thresholdPIcker';
import { SortingOptions } from '../../Models/Tasks';
import { Threshold, ConfiguratorProps } from '../../Models/Configurator/Configurator';
import { Dispatch } from 'redux';
import { onConfigSave } from '../../redux/actions';

export interface StateProps {
    sortingOptions?:Array<SortingOptions>,
    onTimeProps?: Threshold,
    warningProps?: Threshold,
    delayedProps?: Threshold,        
}

const stateProps: StateProps = {
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
}

declare interface IConfiguratorProps {
    saveConfig: (state:StateProps) => void;
    config: ConfiguratorProps;
}

const Configurator = (props:IConfiguratorProps) => {
    const [state, setConfigState] = useState(props.config || stateProps);   
    return (
        <View style={styles.containerView}>
            <View style={styles.header}><Text h1>Configurator</Text>
            <Button title='Save' onPress={() => props.saveConfig(state)} containerStyle={styles.button}/></View>
            <ScrollView >
            <ListItem
                    key={0}
                    title={'Sort Options'}
                    titleStyle={styles.listTitleStyle}
                    containerStyle={styles.containerListElement}
                    subtitle={<SortingElement setConfigState={(newState) => setConfigState({...state, ...newState})} selectedItems={state.sortingOptions} />}
                />
            <ListItem
                    key={1}
                    title={'On Time Tasks Options'}
                    subtitle={<ThresholdPicker stateProperty="onTimeProps" setConfigState={(newState) => setConfigState({...state, ...newState})} {...state.onTimeProps} />}
                    containerStyle={styles.containerListElement}
                    //subtitle="Select the Color and limit theshold for on Time Tasks"
                />
            <ListItem
                    key={2}
                    title={'Warning Tasks Options'}
                    subtitle={<ThresholdPicker stateProperty="warningProps" setConfigState={(newState) => setConfigState({...state, ...newState})} {...state.warningProps} />}
                    //subtitle="Select the Color and limit theshold for Warning Tasks"                    
                    containerStyle={styles.containerListElement}
                />
            <ListItem
                    key={3}
                    title={'Delayed Tasks Options'}
                    //subtitle="Select the Color and limit theshold for Delayed Tasks"                    
                    subtitle={<ThresholdPicker stateProperty="delayedProps" setConfigState={(newState) => setConfigState({...state, ...newState})} {...state.delayedProps} />}
                    containerStyle={styles.containerListElement}
                />
            </ScrollView>    
        </View>
    )
}

const mapStateToProps = (state: any) => ({
    config:state.config.config,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveConfig: (config:ConfiguratorProps) => dispatch(onConfigSave(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configurator)
