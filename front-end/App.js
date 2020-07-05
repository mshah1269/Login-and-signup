import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src/navigation';
import { theme } from './src/core/theme';

import {createStore , combineReducers} from 'redux';

import  authReducer  from "./store/reducers/Auth";


const rootReducers = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducers);

const Main = () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider> 
  </StoreProvider>
);

export default Main;
 