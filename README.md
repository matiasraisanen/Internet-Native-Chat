
# Internet Native Chat (INC)

A react native chatting application with a connection to a MySQL database.

## Back End

MySQL database where all the messages are stored.    
PHP-scripts on the server side handle the connection to database.

Front end application calls these scripts:    
[showmessages.php](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/php_scripts/showmessages.php) outputs all the messages as a RESTful service.    
[addmsg.php](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/php_scripts/addmsg.php) is used to add new messages to the database.    
[cfg.php](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/php_scripts/cfg.php) contains the connection configuration.



## Front End

Uses navigation to switch between different screens.    
[Home.js](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/Home.js) contains a welcome screen, where the user sets their nick.    
INC-logo animated using [Animated](https://facebook.github.io/react-native/docs/animations.html)

[ChatScreen.js](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/ChatScreen.js) contains the chatting application. Chat refresh rate is 5 seconds.

[MsgDetails.js](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/MsgDetails.js) shows the details of a message that the user presses in the chat.

[Info.js](https://github.com/matiasraisanen/Internet-Native-Chat/blob/master/Info.js) is just a short application info page.
