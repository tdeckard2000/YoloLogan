const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const request = require('request');
const { MongoClient } = require("mongodb");
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

app.post('/api/getAddressCoordinates', async (req, res)=>{
  const city = req.body.city;
  const state = req.body.state;
  const street = req.body.street;
  const coordinates = await getGeoCensusLocationsData(street, city, state);
  console.log(coordinates)
  res.send(coordinates);
});

app.post('/api/postNewEvent', async (req, res)=>{
  const newEvent = req.body;

  console.log(newEvent)

  db.collection('events').insertOne(newEvent, (err, val)=>{
    if(err) {
      console.warn("Error Posting: " + err)
    } else {
      res.send(val)
    };
  });
});

const getGeoCensusLocationsData = function(street, city, state) {
  const fullAddress = street + ', ' + city + ', ' + state;
  const requestURL = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address='
  + encodeURIComponent(fullAddress) + '&benchmark=2020&format=json';

  return new Promise((resolve, reject)=>{
    request(requestURL, (err, res, body)=>{
      if(err) {
        console.warn('geocodingError:' + err);
      } else {
        let coordinates = {};
        const data = JSON.parse(body);
        if(data.result.addressMatches[0]) {
          coordinates = {
            coordLat: data.result.addressMatches[0].coordinates.y,
            coordLng: data.result.addressMatches[0].coordinates.x,
            zip: data.result.addressMatches[0].addressComponents.zip
          };
        } else {
          coordinates = {
            coordLat: 0,
            coordLng: 0,
            zip: 0
          };
        };
        resolve(coordinates);
      };
    });
  });
}

app.listen(port, ()=>{
  console.warn("Listening on " + port);
});
