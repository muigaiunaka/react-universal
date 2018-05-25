import React, { Component } from 'react';
import {
    Text,
    View,
    Navigator,
    TextInput,
    Button
} from 'react-native';
import ScreensStyles from '../utils/ScreensStyles';
import InputStyles from '../utils/InputStyles';

export default class SigninScreen extends Component {
    static navigationOptions = {
        title: 'Sign in',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TextInput
                    style={[InputStyles.input]}
                    placeholder="Sign in"
                    keyboardType="default"
                />
                <Button
                    title="Don't have an account yet? Sign up here."
                    onPress={() =>
                        navigate('Signup')
                    }
                />
                <Button
                    title="Go to home screen"
                    onPress={() =>
                        navigate('Home')
                    }
                />
            </View>
        )
    }
}