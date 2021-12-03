const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const { EBADF } = require('constants');
require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology: true});

app.use(cors());

app.use(express.static(__dirname + '/dist/yoloLogan'));
const db = client.db("YoloLogan");

client.connect((err, res)=>{
  if(err){
    console.warn('DB Connection Error');
  }else{
    console.warn('Connected to DB')
  };
});

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname+'/dist/yoloLogan/index.html'));
});

app.get('/api/getAllEvents', async (req, res)=>{
  console.log("HERE")
  const result = await db.collection('events').find({title: "Dogs Splash Pool Day"}).toArray();
  console.log(result)
  res.send(result)
});

app.listen(port, ()=>{
  console.warn("Listening on " + port);
});
