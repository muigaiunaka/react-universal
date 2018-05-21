import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import {
  createStackNavigator,
} from 'react-navigation';

const RootStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Signin: { screen: SigninScreen },
  Signup: { screen: SignupScreen },
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <RootStack />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
