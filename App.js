import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert, FlatList} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './Home';
import ChatScreen from './ChatScreen';
import MsgDetails from './MsgDetails';
import Info from './Info';

export default class App extends React.Component {

  constructor() {
    super();
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
    Info: {screen: Info},
  },
  { headerMode: 'none' }
);
