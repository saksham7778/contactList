const express= require('express');
const port =8000;
const path = require('path');
const db = require('./config/mongoose')

const app = express();
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname,'views'));

//middleware 1 => for encoding  
app.use(express.urlencoded());
//middleware 2  ==> for styling
app.use(express.static('assets'));

//static kind of database
var contactList =[
    {
        name : 'saksham',
        phone: '1234567890'
    },

    {
        name : 'hello',
        phone: '1111111111'
    },

    {
        name : 'sak',
        phone: '1231234678'
    }        
]



app.get('/',function(request,response){

    // console.log(request.url);
    return response.render('home',{
        title: "Contact List!",
        contact_list: contactList
    });
});

app.post('/create-contact',function(request,response){
    contactList.push({
        name :request.body.name,
        phone:request.body.phone
    })
    return response.redirect('back');
});

///// for deleting a contact 
app.get('/delete-contact/',function(request,response){

    console.log(request.query);
    let phone=request.query.phone;

    let contactIndex=contactList.findIndex( (contact) => {
                                                            return (contact.phone == phone)
                                                         });
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }

    return response.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup ! my express server is running on port :',port );
});