import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, Button, TextInput, Image, Animated, Easing} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

export default class Home extends React.Component{


  constructor() {
    super();
    this.state = { msgDate: '', msgTime: '', msgMsg: '', msgSender: '', msgChannel: '' }
}

componentWillMount() {
  this.setMessage();
}

  setMessage = () => {
    {/* Sets the desired nickname using the navigation parameters */}
    const {params} = this.props.navigation.state;
    this.setState({ msgDate: params.msgDate,
                    msgTime: params.msgTime,
                    msgMsg: params.msgMsg,
                    msgSender: params.msgSender,
                    msgChannel: params.msgChannel,
                  });
  }


  render() {

    const {navigate} = this.props.navigation;
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.main}>

      <Header
        outerContainerStyles={{ height: 90, alignSelf: 'stretch', backgroundColor: '#3D6DCC' }}
        innerContainerStyles={{ alignItems: 'flex-end'}}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{text: 'Message Details', style: {color: '#fff', fontSize: 18}}}
        rightComponent={<Icon
                        name='home'
                        color='#fff'
                        />}
      />


        <View style={{padding: 10, alignItems: 'center'}}>
          <Text>Sent: {this.state.msgDate} at {this.state.msgTime}</Text>
          <Text>Sender: {this.state.msgSender}</Text>
          <Text>Channel: {this.state.msgChannel}</Text>
          <Text style={{maxWidth: 250}}>Message: {this.state.msgMsg}</Text>
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
