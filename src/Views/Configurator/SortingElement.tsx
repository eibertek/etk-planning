import React, { useState } from 'react'
import MultiSelect from 'react-native-multiple-select';
import { SortingOptions } from '../../Models/Tasks';
import { StateProps } from '.';

declare type SortingItem = {id:SortingOptions, name:SortingOptions};
interface SortingProps {
    setConfigState: (stateProps:StateProps) => void;
    selectedItems?: Array<SortingOptions>;
}

const getSortingOptions = (): Array<SortingItem> => {
    const sortingOptions:Array<SortingItem> = [
        {id:'status', name:'status'}, 
        {id:'name', name:'name'}, 
        {id:'estimated', name:'estimated'}, 
        {id:'description', name:'description'}, 
        {id:'charge', name:'charge'}];
    return sortingOptions;
};
 
export const SortingElement = (props:SortingProps) =>{    
    const pickerElements = getSortingOptions();
    return (<>
        <MultiSelect
     //   hideTags
          items={pickerElements}
          uniqueKey="id"
    //    ref={(component) => { reference = component }}
          onSelectedItemsChange={(items)=> props.setConfigState({sortingOptions:items})}
          selectedItems={props.selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
 //         onChangeInput={ (items)=> props.setConfigState({sorting:multiSelectToState(items)})}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
    </>);
};

