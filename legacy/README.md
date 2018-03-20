
## Internet Native Chat (INC)

A react native chatting application with a connection to a MySQL database.

## Back End

MySQL database where all the messages are stored.
PHP-scripts on the server side handle the connection to database.
Front end application calls these scripts:    
showmessages.php outputs all the messages as a RESTful service.    
addmsg.php is used to add new messages to the database.    
cfg.php contains the connection configuration.



## Front End

Uses navigation to switch between different screens.
Home screen contains a welcome screen, where the user sets their nick.
ChatScreen contains the chatting application. Chat refresh rate is 5 seconds.


## Sources
[Output JSON array in PHP](https://stackoverflow.com/questions/8706008/output-json-array-in-php)

[Insert data into database through PHP](https://tutorialscapital.com/insert-data-into-database-through-php-mysql-react-native-android-ios-tutorial/)
