import React from 'react'
import { View, Picker } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

const updateSearch = () => {};

const index = () => {
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
                    <Picker.Item label="Sort by Estimated" value="estimated" />
                    <Picker.Item label="Sort by Status" value="status" />
                    <Picker.Item label="Sort by Name" value="name" />
                </Picker>
        </View>
)
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
