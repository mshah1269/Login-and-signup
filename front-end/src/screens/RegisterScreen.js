import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';

import { useSelector , useDispatch } from 'react-redux';
import * as Authaction from '../../store/actions/Auth';

import AsyncStorage from '@react-native-community/async-storage';

const RegisterScreen = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    console.log(name.value , email.value , password.value);
    fetch("http://192.168.0.110:3000/signup", { 
    method: "POST", 
    body: JSON.stringify({ 
        name: name.value , 
        email: email.value , 
        password: password.value  
    }),  
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
    }) 
    // Converting to JSON 
    .then(response => response.json()) 
    // Displaying results to console 
    .then(async (data)=>{
      if(data.error){
        console.log(data.error)
        setEmail({ ...email, error: data.error });

      }
      else{
        try {
          await AsyncStorage.setItem('token',data.token)
          console.log("data got : " , data.token)
          // props.navigation.navigate('HomeStackScreen', {
          //   screen: 'Dashboard',
          // })
          dispatch(Authaction.token(true,data.token));
        } catch (e) {
          console.log("error hai",e)
        }

      }
    }) 
    .catch((error)=>{
      console.log("Api call error");
      alert(error.message);
    });
  };

  return (
    <Background>
      <BackButton goBack={() => props.navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
