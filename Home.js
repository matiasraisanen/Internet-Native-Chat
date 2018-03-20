import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, Button, TextInput, Alert, FlatList, Image, Animated, Easing} from 'react-native';
import {StackNavigator} from 'react-navigation';
import{ Header, Icon } from 'react-native-elements';

export default class Home extends React.Component{


  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
    this.state = {nick: ''}
  }

  componentDidMount () {
    this.spin()
  }

  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        delay: 4000
      }
    ).start(() => this.spin())
  }

  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const {navigate} = this.props.navigation;
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.main}>

      <Header
      outerContainerStyles={{ height: 90, alignSelf: 'stretch', backgroundColor: '#3D6DCC' }}
      innerContainerStyles={{ alignItems: 'flex-end'}}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{text: 'Internet Native Chat', style: {color: '#fff', fontSize: 18}}}
        rightComponent={<Icon
                        name='home'
                        color='#fff'
                        />}
      />

        <View style={styles.welcome}>
        <Animated.Image
        style={{
          width: 200,
          resizeMode: 'contain',
          transform: [{rotate: spin}] }}
          source={require('./img/smallogo.png')}
          />
        </View>

        <View style={styles.inputsContainer}>
        <Text>What should we call you?</Text>
          <TextInput placeholder = "nickname" style = {styles.textInput} onChangeText = {(text) => this.setState({nick: text})} value={this.state.nick}/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputsContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#3D6DCC',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
