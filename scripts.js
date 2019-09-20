//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const path=require("path");
const nodemailer=require('nodemailer');

const app=express();
mongoose.connect("mongodb://localhost:27017/tanishq",{ useNewUrlParser: true });
var db=mongoose.connection;
db.on('error',console.log.bind(console,"connection error"));
db.once('open',function(callback){
  console.log("connection succeded");
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tanishqsoni111@gmail.com',
    pass: 'abhi nhi bataunga'
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/static', express.static('public'));

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/Register.html",function(req,res){
  res.sendFile(path.join(__dirname,"public","Register.html"));
});

app.get("/index.html",function(req,res){
  res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/contactus.html",function(req,res){
  res.sendFile(path.join(__dirname,"public","contactus.html"));
});

app.get("/adept.html",function(req,res){
  res.sendFile(path.join(__dirname,"public","adept.html"));
});

app.get("/guidelines.html",function(req,res){
  res.sendFile(path.join(__dirname,"public","guidelines.html"));
});

app.get("/About.html",function(req,res){
  res.sendFile(path.join(__dirname,"public","About.html"));
});

app.post("/",function(req,res){
  const name=req.body.name;
  const email=req.body.email;
  const branch=req.body.Branch;
  const en=req.body.EN;
  const year=req.body.year;
  const mobile=req.body.MN;

console.log(name);
console.log(email);
console.log(branch);
console.log(en);
console.log(year);
console.log(mobile);

var data={
    name :name,
    email:email,
    branch:branch,
    Enumber:en,
    year:year,
    mobile:mobile
  };

  db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });
    const mailOptions = {
      from: 'tanishqsoni111@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    res.sendFile(path.join(__dirname,"public","registration_succesfull.html"));
});

app.listen(3000,function(){
  console.log("+server started");
});
