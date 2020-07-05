import React, { useState, useEffect , memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

import { useSelector , useDispatch } from 'react-redux';
import * as Authaction from '../../store/actions/Auth';

import AsyncStorage from '@react-native-community/async-storage';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email,setEmail] = useState("loading")
   const Boiler = async ()=>{
    const token = await AsyncStorage.getItem("token")
    fetch("http://192.168.0.110:3000/",{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      setEmail(data.email)
    })
    .catch((error)=>{
      console.log("Api call error");
      alert(error.message);
    });
   }
useEffect(()=>{
   Boiler()
},[])
  
  // const logout =(props)=>{
  //   console.log("pressed logout")
  //   AsyncStorage.removeItem("token").then(()=>{
  //     props.navigation.navigate('AuthStackScreen',{
  //       screen : 'HomeScreen'
  //     })
  //   })
  // }


  return(
    <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      {email}
    </Paragraph>
    <Button mode="outlined" onPress={() =>{
       console.log("pressed logout")
       try{
         AsyncStorage.removeItem("token").then(()=>{
           console.log('token remove')
          //  navigation.navigate('AuthStackScreen',{
          //   screen : 'HomeScreen'
          // })
          dispatch(Authaction.token(false,null));
         })

       } catch (e) {
        console.log("error in dashboard",e)
      }

    }}>
      Logout
    </Button>
  </Background>

  )
  
  };

export default memo(Dashboard);
