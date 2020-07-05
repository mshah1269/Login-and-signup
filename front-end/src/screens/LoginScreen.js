import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

import { useSelector , useDispatch } from 'react-redux';
import * as Authaction from '../../store/actions/Auth';

import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ navigation }) => {

  
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    fetch("http://192.168.0.110:3000/signin", { 
    method: "POST", 
    body: JSON.stringify({ 
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
          // navigation.navigate('HomeStackScreen', {
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
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome back.</Header>

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

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
