import React from 'react'
import { View, Picker } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

const updateSearch = () => {};

const index = (props:any) => {
    return (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', width:'100%'}}>
           <SearchBar
                placeholder="Search Tasks here..."
                onChangeText={updateSearch}
                value={''}
                lightTheme
                containerStyle={{width:'50%'}}
            />               
            <Picker
                selectedValue={''}
                style={{height: 50,width:'50%'}}
                onValueChange={(itemValue, itemIndex) => {}}>
                    {props.config.sortingOptions && props.config.sortingOptions.map((el:string) => <Picker.Item label={`Sort by ${el}`} value={el} />)}
                </Picker>
        </View>
)
}

const mapStateToProps = (state: any) => ({
    config: state.config.config,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
