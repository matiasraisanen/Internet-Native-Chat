import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, Button, TextInput, Image, Animated, Easing} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

export default class Info extends React.Component{


  constructor() {
    super();
}

componentWillMount() {

}

  render() {
    const {goBack} = this.props.navigation;
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.main}>

      <Header
        outerContainerStyles={{ height: 90, alignSelf: 'stretch', backgroundColor: '#3D6DCC' }}
        innerContainerStyles={{ alignItems: 'flex-end'}}

        centerComponent={{text: 'Info', style: {color: '#fff', fontSize: 18}}}
        leftComponent={<Icon
                        name='arrow-back'
                        color='#fff'
                        onPress = {() => goBack()}
                        />}
      />

      <View style={{padding: 30, alignItems: 'flex-start'}}>

        <Text>React Native chat app by Matias Räisänen, 2018</Text>
        <Text></Text>
        <Text>Source code at:</Text>
        <Text>https://github.com/matiasraisanen/Internet-Native-Chat</Text>

      </View>

        <View style={{padding: 150, alignItems: 'center'}}>
        <Image source={require('./img/info.png')} style={{padding: 20, width: 200, height: 200}} />
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
