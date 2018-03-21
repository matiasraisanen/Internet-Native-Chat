import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert, FlatList} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './Home';
import ChatScreen from './ChatScreen';
import MsgDetails from './MsgDetails';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { messages: [], channelMessages: [], nick: '', message: '', channel: 'general'}
}

render() {
  return(
    <NativeChat/>
  );
}
}

const NativeChat = StackNavigator(
  {
    Home: {screen: Home},
    ChatScreen: {screen: ChatScreen},
    MsgDetails: {screen: MsgDetails},
  },
  { headerMode: 'none' }
);
