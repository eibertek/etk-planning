import React from 'react'
import { View, Text, Button, ImageBackground,TouchableOpacity } from 'react-native'
import { styles } from '../../Styles';

export interface Props {
    name: string;
    navigation: any;
  }

const index: React.FunctionComponent<Props> = (props:Props) => {
    return (
        <View style={styles.body}>
              <ImageBackground
                accessibilityRole={'image'}
                source={require('../../images/etkPlanning-logo.png')}
                style={styles.background}
                imageStyle={styles.logo}>
                <Text style={styles.logoText} >Etk Planning</Text>
              </ImageBackground>
              <Text style={styles.sectionTitle}>{props.name || ' Landing Page '}</Text>
          <View>
            <TouchableOpacity
              style={{...styles.buttonRounded, ...styles.buttonXS}}
              onPress={() => props.navigation.push('ViewTask')}
            >
              <Text style={{...styles.buttonText, ...styles.textXS}}>See All Tasks</Text>  
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.buttonRounded, ...styles.buttonMD}}
              onPress={() => props.navigation.push('NewTask')}
            >
              <Text style={{...styles.buttonText, ...styles.textMD}}>(+)</Text>  
            </TouchableOpacity>
          </View>               
        </View>
    )
}

export default index;
