import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Navigator,
    TextInput,
    Button
  } from 'react-native';
import styles from '../utils/ScreensStylesheet';

const platform = Platform.select({
    ios: 'iOS Home',
    android: 'Android Home',
  });

export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
            <Text style={[styles.textCenter, styles.banner]}>
                {platform}
            </Text>
            <TextInput />
            <Button
            title="Go to sign in screen"
            onPress={() =>
                navigate('Signin')
            }
            />
        </View>
      );
    }
  }