import React,{useEffect,useState} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector , useDispatch } from 'react-redux';
// import * as Authaction from '../../store/actions/Auth';

import AsyncStorage from '@react-native-community/async-storage';

import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    LoadingScreen
  } from './screens';


  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator  
      screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name="HomeScreen" component={HomeScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AuthStack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );

  const HomeStack = createStackNavigator();
  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
    </HomeStack.Navigator>
  );

  
  
  const Router = () => {

    
    // const dispatch = useDispatch();
    const token_status = useSelector(state => state.auth.status);
    console.log("token status",token_status)
    const [isLoading,setIsLoading] = useState(true)
    const [token, settoken] = useState(null)

    const detectLogin= async ()=>{

      if(token_status){
        console.log("token from redux")
        settoken(true)
      }else{
        const tokenno = await AsyncStorage.getItem('token')
        if(tokenno){
          console.log("token got")
          // setLoading(false)
          settoken(true)
        }else{
          console.log("no token got")
            // setLoading(true)
          settoken(false)
        }

      }

     
   }
    useEffect(()=>{
      detectLogin()
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },[token_status])

    // if (isloggedin==false) {
    //   console.log("gone to loading screen")
    //   return <LoadingScreen />;
    // }

    
    // if (!isloading) {
    //   console.log("not loading")

    // }

   

    const RootStack = createStackNavigator();
    return (
     
     <NavigationContainer>
        <RootStack.Navigator 
        // initialRouteName="HomeScreen" 
        screenOptions={{
            headerShown: false
        }}>
           {isLoading ? (
              <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
            ) : token ? (
              <RootStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
            ) : (
              <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
            )}
         
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
  
  
  export default Router;