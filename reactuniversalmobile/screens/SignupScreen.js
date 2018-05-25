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

export default class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Sign up',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TextInput
                    style={[InputStyles.input]}
                    placeholder="Sign up"
                />
                <Button
                    title="Already have an account? Sign up here."
                    onPress={() =>
                        navigate('Signin')
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