import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, KeyboardAvoidingView, Picker, } from 'react-native';
import {StackNavigator} from 'react-navigation';
import{ Header, Icon, Overlay } from 'react-native-elements';

export default class App extends React.Component {

  constructor()
{
    super();
    this.state = { messages: [], channelMessages: [], nick: 'Peter', message: '', channel: 'general', loading: false, }
}

componentWillMount() {
 this.fetchMessages()
}

channelPicker = () => {
  {/* Channel selector on top of screen */}
  return(
    <Picker
      mode='dropdown'
      style={{ left: 30, top: 12, borderRadius: 1, borderColor: 'white', color: '#fff', width: 160}}
      itemStyle={{  color: 'red'}}
      selectedValue={this.state.channel}
      onValueChange={(itemValue) => {this.setState({channel: itemValue},() => {this.filterMessages();});
      }}>
     <Picker.Item label="General" value="general" />
     <Picker.Item label="Off-topic" value="off-topic" />
     <Picker.Item label="Living Room" value="livingroom" />
    </Picker>
  );
}

sendMessage = () => {
  {/* Send and save a message into database. */}
    this.setState({time: this.messageTime})
    this.setState({ loading: true}, () =>
    {
        fetch('http://renki.dy.fi/nativechat/addmsg.php', //RESTful service for retrieving messages.
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                nick: this.state.nick,
                message: this.state.message,
                channel: this.state.channel
            })

        }).then((response) => response.json()).then((responseJson) =>
        {
            this.setState({ loading: false});
        }).catch((error) =>
        {
            console.error(error);
            this.setState({ loading: false});
        })
        .then(this.fetchMessages)
        .then(this.setState({message: ''}));
    })

}

filterMessages = () => {
  {/* Filter messages by channel. */}
  var channel = this.state.channel;
  var filteredMessages = this.state.messages.filter(function (el) {
    return (el.channel === channel);
  });
  this.setState({channelMessages: filteredMessages});
}

fetchMessages = () => {
  fetch('http://renki.dy.fi/nativechat/showmessages.php')
  .then((response) => response.json())
    .then((responseJson) => {
      this.setState({messages: responseJson.messages.reverse()}); //Reverse the list of messages for FlatList
    })
      .then(this.filterMessages)  //This refreshes the filtered list on message retrieval.
  .catch((error) => {
    Alert.alert(error);
  });
}

listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};



  render() {
    return(


                <KeyboardAvoidingView behavior="padding" style={styles.main}>
                {/* Main container. Contains heading and child containers.*/}

                <Header
                outerContainerStyles={{ height: 90, alignSelf: 'stretch', backgroundColor: '#3D6DCC' }}
                innerContainerStyles={{ alignItems: 'flex-end'}}
                  leftComponent={{ icon: 'menu', color: '#fff' }}
                  centerComponent={this.channelPicker()}
                  rightComponent={<Icon
                                  name='refresh'
                                  color='#fff'
                                  onPress = {this.fetcMessages}
                                  />}
                />

                  <View style={styles.messageContainer}>
                  {/* Contains the chat messages */}

                  <FlatList
                    inverted    //Render the list inverted, so that the latest message is always seen.
                    style={{marginLeft: '5%', alignSelf: 'stretch'}}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>(
                      <Text style={styles.time}>{item.time} |
                      <Text style={styles.nick}>{item.nick}:
                      <Text style={styles.messagetext}> {item.message}
                      </Text>
                      </Text>
                      </Text>
                    )}

                    data={this.state.channelMessages} //Messages filtered by selected channel
                    ItemSeparatorComponent={this.listSeparator} />
                    </View>

                    <View style={styles.inputsContainer}>
                    {/* Contains the message input box and send button */}
                      <View style={{flex: 5}}>

                        <TextInput placeholder = "Message" style = {styles.textInput} onChangeText = {(text) => this.setState({message: text})} value={this.state.message}/>
                      </View>

                      <View style={{flex: 1}}>
                      {/* Shows the send button if state is not loading. Otherwise, shows ActivityIndicator */}

                        {
                          (this.state.loading == false)?
                          (<Icon
                          reverse
                          name='send'
                          color='#3D6DCC'
                          onPress = {
                            this.sendMessage}
                          />)
                          :
                          (<ActivityIndicator size = "large" />)
                        }
                      </View>

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

  messageContainer: {
    flex: 8,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    alignSelf: 'stretch',
    marginLeft: 10,
    padding: 2,
    fontSize: 16
  },

  inputsContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3D6DCC',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },

  nick: {
    fontSize: 14,
    color: '#0000ff'
  },

  time: {
    fontSize: 14,
    color: '#000000'
  },

  messagetext: {
    fontSize: 12,
    color: '#000000'
  },

  Btn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
    },

  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },


});
