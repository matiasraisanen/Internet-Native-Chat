import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, KeyboardAvoidingView, Picker, Alert, Modal} from 'react-native';
import {StackNavigator} from 'react-navigation';
import{ Badge, Header, Icon,} from 'react-native-elements';

let interval;

export default class ChatScreen extends React.Component {

constructor() {
  super();
  this.state = { messages: [], channelMessages: [], nick: '', message: '', channel: 'general', loading: false, }
}

componentWillMount() {
  this.fetchMessages();
  this.setNick();
}

componentDidMount() {
  {/* ReFresh the chat every 5000 milliseconds */}
  interval = setInterval(() => {
    this.fetchMessages();
    console.log("ReFresh")
  }, 5000);
}

componentWillUnmount() {
  clearInterval(interval);
}

setNick = () => {
  {/* Sets the desired nickname using the navigation parameters */}
  const {params} = this.props.navigation.state;
  this.setState({nick: params.nick});
}

channelPicker = () => {
  {/* Channel selector on top of screen. Picking a channel triggers filterMessages-function. */}
  return(
    <Picker
      mode='dropdown'
      style={{ left: 30, top: 12, borderRadius: 1, borderColor: 'white', color: '#fff', width: 160}}
      itemStyle={{  color: 'red'}}
      selectedValue={this.state.channel}
      onValueChange={(itemValue) => {this.setState({channel: itemValue},() => {this.filterMessages();});
      }}>
     <Picker.Item label="General" value="general" />
     <Picker.Item label="Cats" value="cats" />
     <Picker.Item label="Studying" value="studying" />
     <Picker.Item label="Work" value="work" />
     <Picker.Item label="Living Room" value="livingroom" />
    </Picker>
  );
}

sendMessage = () => {
  {/* Send and save a message into database. */}
    this.setState({time: this.messageTime})
    this.setState({ loading: true}, () =>
    {
        fetch('http://renki.dy.fi/nativechat/addmsg.php', //RESTful service for adding messages.
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
        .then(this.fetchMessages) //Retrieve the new messagelist from the server
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
{/* Fetch messages from the server */}
  fetch('http://renki.dy.fi/nativechat/showmessages.php') //RESTful service for adding messages.
  .then((response) => response.json())
    .then((responseJson) => {
      this.setState({messages: responseJson.messages.reverse()}); //Reverse the list of messages for FlatList
    })
      .then(this.filterMessages)  //Refresh the filtered list on message retrieval.
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

renderChat = ({item}) => {
  {/* Render chat messages for FlatList */}
  const {navigate} = this.props.navigation;

  return (
    <View style={{padding: 5, flexDirection: 'row',}}>
          <View style={{minWidth: 90, padding: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style={styles.nick}>{item.nick} </Text>
            <Text style={styles.time}>{item.time} </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Badge  containerStyle={{ minHeight: 30, width: 250, backgroundColor: '#b3d6ff'}}
            onPress={() => navigate('MsgDetails', { msgSender: item.nick,
                                                    msgDate: item.date,
                                                    msgTime: item.time,
                                                    msgMsg: item.message,
                                                    msgChannel: item.channel,
                                                  })}>
              <Text style={styles.messagetext}> {item.message}</Text>
            </Badge>
          </View>
    </View>
  )
}

  render() {

    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;

    return(


                <KeyboardAvoidingView behavior="padding" style={styles.main}>
                {/* Main container. Contains heading and child containers.*/}

                <Header
                  outerContainerStyles={{ height: 90, alignSelf: 'stretch', backgroundColor: '#3D6DCC' }}
                  innerContainerStyles={{ alignItems: 'flex-end'}}
                  rightComponent={<Icon
                                  name='info'
                                  color='#fff'
                                  onPress={() => navigate('Info')}
                                  />}
                  centerComponent={this.channelPicker()}
                  leftComponent={<Icon
                                  name='arrow-back'
                                  color='#fff'
                                  onPress = {() => goBack()}
                                  />}
                />

                  <View style={styles.messageContainer}>
                  {/* Contains the chat messages */}

                  <FlatList
                    inverted    //Render the list inverted, so that the latest message is always seen.
                    style={{marginLeft: '5%', alignSelf: 'stretch'}}
                    keyExtractor={item => item.id}
                    renderItem={this.renderChat}

                    data={this.state.channelMessages} //Messages filtered by selected channel
                    ItemSeparatorComponent={this.listSeparator} />
                    </View>

                    <View style={styles.inputsContainer}>
                    {/* Contains the message input box and send button */}
                      <View style={{flex: 5}}>

                        <TextInput placeholder = {this.state.nick} style = {styles.textInput} onChangeText = {(text) => this.setState({message: text})} value={this.state.message}/>
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
                          />) : (<ActivityIndicator size = "large" />)
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
    borderWidth: 0,
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
    color: '#3D6DCC'
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
