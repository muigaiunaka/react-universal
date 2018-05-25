import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Navigator,
  TextInput,
  Button
} from 'react-native';
import ScreensStyles from '../utils/ScreensStyles';
import InputStyles from '../utils/InputStyles';

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
        <Text style={[ScreensStyles.textCenter, ScreensStyles.banner]}>
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