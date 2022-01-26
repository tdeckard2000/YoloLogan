const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const { EBADF } = require('constants');
const { devNull } = require('os');
require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology: true});

app.use(cors());
app.use(express.static(__dirname + '/dist/yoloLogan'));
app.use(bodyParser.json());

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
  const result = await db.collection('events').find().toArray();
  res.send(result)
});

app.post('/api/postNewEvent', async (req, res)=>{
  const newEventObject = req.body;
  db.collection('events').insertOne(newEventObject, (err, val)=>{
    if(err) {
      console.warn("Error Posting: " + err)
    } else {
      res.send(val)
    };
  });
});

app.listen(port, ()=>{
  console.warn("Listening on " + port);
});
