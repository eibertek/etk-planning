import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { StateProps } from '.'
import Icon from 'react-native-vector-icons/FontAwesome';
 
declare interface IColorPickerProps {
    color: string,
    setColor:(color:string)=>void,
    name?:string,
}

declare interface IThresholdPickerProps {
    color?: string,
    stateProperty: string,
    limit?:number,
    setConfigState: (stateProps:StateProps) => void;
    name?:string,
}

export const ThresholdPicker = (props: IThresholdPickerProps) => { 
    const thresholdProps = { color: props.color, limit: props.limit};
    return (
        <View>
            <Input 
                style={{flex:1, width:250}}
                placeholder={'Choose a Color'} 
                defaultValue={props.color ? props.color : '0'} keyboardType="numbers-and-punctuation" 
                onChangeText={(color)=>{
                    props.setConfigState({[props.stateProperty]:{...thresholdProps, color}})
                }}
                leftIcon={<Icon
                    name='circle'
                    size={24}
                    color={props.color}
                  />}
            />            
            <Input 
                placeholder={'Choose a limit threshold, in hours'} 
                defaultValue={props.limit ? props.limit.toString() : '0'} keyboardType="number-pad" 
                onChangeText={(limit)=>{
                    props.setConfigState({[props.stateProperty]:{...thresholdProps, limit:parseInt(limit)}})
                }}
            />
        </View>
    );
}

export default ThresholdPicker
