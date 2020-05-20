// require library
const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },  

    phone: {
        type:String,
        required:true
    }
});

//the name in 'contact' will be shown as contacts in database you can see it in Robo3t
const Contact = mongoose.model('contact',contactSchema);  
module.exports=Contact;