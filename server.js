const express = require('express');
const path = require('path');
const app = express();
const { MongoClient } = require("mongodb");
const { EBADF } = require('constants');
require('dotenv').config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology: true});

async function runMongoDB() {
  try {
    await client.connect();
    const db = client.db("YoloLogan");
    console.warn("Connected successfully to server");

    // const test = function(){
    //   db.collection('events').find({title: "Dogs Splash Pool Day"}).toArray((err, res)=>{
    //     console.log(res, err)
    //     return res
    //   });
    // }

    // app.get('/mytest', (req, res)=>{
    //   console.log("HERE")
    //   res =  db.collection('events').find({title: "Dogs Splash Pool Day"}).toArray((err, res)=>{
    //     console.log(res, err)
    //     return res
    //   });
    // })

    // const test = await db.collection('events').findOne({title: "Dogs Splash Pool Day"})
    // console.log(test)

  } finally {
    await client.close();
  }
}

runMongoDB().catch(console.dir);

app.use(express.static(__dirname + '/dist/yoloLogan'));

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname+'/dist/yoloLogan/index.html'));
});

app.get('/test', async function (req, res){
  await client.connect()
  client.db("YoloLogan").collection('events').find({}).toArray((err, res)=>{
    console.log(err, res)
  })
});

app.listen(port, ()=>{
  console.warn("Listening on port " + port);
});
