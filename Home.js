import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, Button, TextInput, Image, Animated, Easing} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

export default class Home extends React.Component{


  constructor() {
    super();
    this.state = {nick: '',  spinValue: new Animated.Value(0), sizeValue: new Animated.Value(1) };
  }

  componentDidMount () {
    this.logoAnimation();
  }

  componentWillUnmount() {
    this.state.sizeValue.stopAnimation();
    this.state.spinValue.stopAnimation();
  }

  logoAnimation() {
    {/* Create a spinning and breathing animation for the logo */}
    Animated.loop(
      Animated.parallel([
        Animated.timing( this.state.spinValue,
          {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            delay: 3000
          }
        ),
        Animated.sequence([
          Animated.timing(this.state.sizeValue,
            {
            toValue: 10,
            duration: 400,
            easing: Easing.linear,
            delay: 3000
          }),
          Animated.timing(this.state.sizeValue,
            {
            toValue: 1,
            duration: 400,
            easing: Easing.linear,
          }),
        ])
    ])
    ).start();
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const size = this.state.sizeValue.interpolate({
      inputRange: [1, 10],
      outputRange: [200, 300],
      extrapolate: 'clamp',
    });

    const {navigate} = this.props.navigation;
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.main}>

      <Header
        outerContainerStyles={{ height: 90, alignSelf: 'stretch', backgroundColor: '#3D6DCC' }}
        innerContainerStyles={{ alignItems: 'flex-end'}}
        centerComponent={{text: 'Internet Native Chat', style: {color: '#fff', fontSize: 18}}}
        rightComponent={<Icon
                        name='info'
                        color='#fff'
                        onPress={() => navigate('Info')}
                        />}
      />

        <View style={styles.welcome}>
          <Animated.Image
            style={{
              width: size,
              transform: [{rotate: spin}],
              resizeMode: 'contain',
              }}
            source={require('./img/smallogo.png')}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text>What should we call you?</Text>

          <TextInput placeholder = "nickname" style={styles.textInput} onChangeText={(text) => this.setState({nick: text})} value={this.state.nick} onSubmitEditing={() => navigate('ChatScreen', {nick: this.state.nick})} returnKeyType='go'/>


          <Button onPress={() => navigate('ChatScreen', {nick: this.state.nick})} title="Let me in!"/>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  welcome: {
    flex: 4,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputsContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#3D6DCC',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    alignSelf: 'stretch',
    marginLeft: 10,
    padding: 2,
    fontSize: 16
  },

  logo: {
    width: 200,
  },




});
