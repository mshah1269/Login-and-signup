import React,{useEffect , memo} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = () => {


  // const detectLogin= async ()=>{
  //   const token = await AsyncStorage.getItem('token')
  //       if(token){
  //           console.log("load token")
  //           navigation.replace("Dashboard")
  //       }else{
  //         console.log("load token not");
  //         navigation.replace("LoginScreen");
  //       }
  // }
  // useEffect(()=>{
  //  detectLogin()
  // },[])

  return (
   <View style={styles.loading}> 
    <ActivityIndicator size="large" color="blue" />
   </View>
  );
};


const styles= StyleSheet.create({
    loading:{
     flex:1,
    justifyContent:"center",
    alignItems:"center" 
    }
    
  })


export default memo(LoadingScreen);