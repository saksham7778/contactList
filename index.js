const express= require('express');
const port =8000;
const path = require('path');

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname,'views'));

//middleware 1 => for encoding  
app.use(express.urlencoded());
//middleware 2  ==> for styling
app.use(express.static('assets'));


app.get('/',function(request,response){

    // console.log(request.url);
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fecting contacts from db');
            return;
        }

        return response.render('home',{
            title: " Contacts List ",
            contact_list: contacts //contacts here refer to the parameter of function above
        });
    });
});

app.post('/create-contact',function(request,response){
    Contact.create({
        name: request.body.name,
        phone:request.body.phone
    },function(err,newContact){

        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return response.redirect('back');
    });
});

///// for deleting a contact 
// app.get('/delete-contact/',function(request,response){

//     console.log(request.query);
//     let phone=request.query.phone;

//     let contactIndex=contactList.findIndex( (contact) => {
//                                                             return (contact.phone == phone)
//                                                          });
//     if(contactIndex != -1){
//         contactList.splice(contactIndex,1);
//     }

//     return response.redirect('back');
// });


app.listen(port, function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup ! my express server is running on port :',port );
});