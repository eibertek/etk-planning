import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    picker:{
        width:150,
        marginLeft:10,
        borderColor:'rgba(200,200,200,0.5)',
    },
    containerListElement:{
        borderLeftWidth:3,
        marginLeft:10,
        borderColor:'rgba(200,200,200,0.5)',
    },  
    listTitleStyle:{
        height:30,
    },
    containerView: {
        flex:0,
        width:'100%',
        marginBottom:100,
    },
    header:{
    //    flex:1,
        width:'100%',
        flexDirection: "row",
    },
    button:{
        marginLeft:10, 
        marginTop:10,
        right:-40,
        width:70,
        height:70,
    },
});