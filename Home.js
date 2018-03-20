import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, Button, TextInput, Alert, FlatList, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Home extends React.Component{


  constructor() {
    super();
    this.state = {nick: ''}
  }

  render() {
    const {navigate} = this.props.navigation;
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.main}>

        <View style={styles.welcome}>
          <Image source={require('./img/smallogo.png')} />
        </View>

        <View style={styles.inputsContainer}>
        <Text>Your nick name:</Text>
          <TextInput placeholder = "nick" style = {styles.textInput} onChangeText = {(text) => this.setState({nick: text})} value={this.state.nick}/>
          <Button onPress={() => navigate('ChatScreen', {nick: this.state.nick})} title="OK"/>
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
});
