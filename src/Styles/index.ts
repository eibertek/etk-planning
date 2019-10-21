import { StyleSheet } from 'react-native'

export const Colors = {
    primary: '#1292B4',
    white: '#FFF',
    lighter: '#F3F3F3',
    light: '#DAE1E7',
    dark: '#444',
    black: '#000',                
  };

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    background: {
      height:100,
      paddingHorizontal:90,
      paddingTop:30,
      backgroundColor: Colors.lighter,
    },
    logo: {
      opacity: 1,
      resizeMode: 'cover',
      width:100,
      height:100,
      paddingLeft: 100  
    },    
    logoText: {
      fontSize:30,
      fontWeight: "600"
    },
    buttonRounded:{
      borderRadius:45,
      paddingVertical:15,
      paddingHorizontal:10,
      backgroundColor:'#00BCD4',
      borderWidth: 1,
      borderColor: '#fff'      
    },
    buttonText:{
      fontSize:30,
      fontWeight:"500",
    },
    buttonXS:{
      width:60,
    },
    buttonMD:{
      width:70,
    },
    textXS:{
      fontSize:10,
      fontWeight:"500",
    },
    textMD:{
      fontSize:30,
      fontWeight:"500",
      paddingLeft:5,
    },    
  });