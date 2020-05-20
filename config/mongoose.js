// require library
const mongoose=require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contact_list');

// acquire the connection to check if it is successful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'connection error to db'));

//up and running then print the message 
db.once('open', function() {
    console.log('successfully connected to database! ');
  // we're connected!
}); 