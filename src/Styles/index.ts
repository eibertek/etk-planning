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
      backgroundColor: Colors.lighter,
      flex: 1,
//      flexFlow: 'row',
      alignItems: 'stretch',            
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
      width:40,
      height:40,
      alignItems:'center',
      marginLeft:20,
    },    
    logoText: {
      fontSize:30,
      fontWeight: "600"
    },
    menuButton:{
      flexDirection:'row',
      backgroundColor: Colors.lighter,
    },
    header:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    exitButton: {
      marginRight:20,
    },
    buttonRounded:{
      width:60,
      height:60,
      borderRadius:45,
      justifyContent: 'center',
      margin:0,
    },
    buttonText:{
    },
    taskList:{
      flexShrink: 0,
    }
  });