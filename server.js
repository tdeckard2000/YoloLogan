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

app.post('/api/getFilteredEvents', async (req, res)=>{
  const searchString = req.body.searchString;
  const filterSelections = req.body.filters;
  const preparedFilters = prepareFilterSelections(filterSelections);
  let result = [];

  const mustMatchFilters = preparedFilters.mustMatchFilters;
  const mustNotMatchFilters = preparedFilters.mustNotMatchFilters;

  if(mustMatchFilters.length <= 0 && mustNotMatchFilters.length <= 0){
    result = await db.collection("events").aggregate([
      {
        $match: {
          $or:
            [
              {"title": {$regex: searchString, '$options': 'i'}},
              {"description": {$regex: searchString, '$options': 'i'}},
              {"contactInfo.firstName": {$regex: searchString, '$options': 'i'}},
              {"contactInfo.lastName": {$regex: searchString, '$options': 'i'}},
            ]
        }
      }
    ]).toArray();

  } else if(mustMatchFilters.length > 0 && mustNotMatchFilters.length <= 0) {
      result = await db.collection("events").aggregate([
        {
          $match: {
            $or:
              [
                {"title": {$regex: searchString, '$options': 'i'}},
                {"description": {$regex: searchString, '$options': 'i'}},
                {"contactInfo.firstName": {$regex: searchString, '$options': 'i'}},
                {"contactInfo.lastName": {$regex: searchString, '$options': 'i'}},
              ]
          }
        },
        {
          $match: {
            "properties": {
              $all: mustMatchFilters,
            }
          }
        }
      ]).toArray();

  } else if(mustMatchFilters.length <= 0 && mustNotMatchFilters.length > 0) {
    result = await db.collection("events").aggregate([
      {
        $match: {
          $or:
            [
              {"title": {$regex: searchString, '$options': 'i'}},
              {"description": {$regex: searchString, '$options': 'i'}},
              {"contactInfo.firstName": {$regex: searchString, '$options': 'i'}},
              {"contactInfo.lastName": {$regex: searchString, '$options': 'i'}},
            ]
        }
      },
      {
        $match: {
          "properties": {
            $nin: mustNotMatchFilters
          }
        }
      }
    ]).toArray();

  } else if(mustMatchFilters.length > 0 && mustNotMatchFilters.length > 0) {
    result = await db.collection("events").aggregate([
      {
        $match: {
          $or:
            [
              {"title": {$regex: searchString, '$options': 'i'}},
              {"description": {$regex: searchString, '$options': 'i'}},
              {"contactInfo.firstName": {$regex: searchString, '$options': 'i'}},
              {"contactInfo.lastName": {$regex: searchString, '$options': 'i'}},
            ]
        }
      },
      {
        $match: {
          "properties": {
            $all: mustMatchFilters,
            $nin: mustNotMatchFilters
          }
        }
      }
    ]).toArray();
  };
  res.send(result);
});

app.post('/api/getAddressCoordinates', async (req, res)=>{
  const city = req.body.city;
  const state = req.body.state;
  const street = req.body.street;
  const coordinates = await getGeoCensusLocationsData(street, city, state);
  res.send(coordinates);
});

app.post('/api/postNewEvent', async (req, res)=>{
  const newEvent = req.body;
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
};

const prepareFilterSelections = function(filterSelections) {
  let mustMatchFilters = [];
  let mustNotMatchFilters = [];
  for (const filter in filterSelections) {
    if(filterSelections[filter] === true) {
      if(filter === "kidFriendly") {
        mustMatchFilters.push("kidFriendly");
        // mustNotMatch.push("adultsOnly")
      } else if(filter === "adultsOnly") {
          // mustMatch.push("adultsOnly");
          mustNotMatchFilters.push("kidFriendly");
      } else if(filter === "freeEvent") {
          mustMatchFilters.push("freeEvent");
          // mustNotMatch.push("paidEvent");
      } else if(filter === "paidEvent") {
          // mustMatch.push("paidEvent");
          mustNotMatchFilters.push("freeEvent");
      } else if(filter === "oneTimeEvent") {
          mustMatchFilters.push("oneTimeEvent");
          // mustNotMatch.push("weeklyEvent", "monthlyEvent");
      } else if(filter === "weeklyEvent") {
          mustMatchFilters.push("weeklyEvent");
          // mustNotMatch.push("oneTimeEvent", "monthlyEvent");
      } else if(filter === "monthlyEvent") {
          mustMatchFilters.push("oneTimeEvent");
          // mustNotMatch.push("weeklyEvent", "oneTimeEvent");
      }  else if(filter === "dogFriendly") {
          mustMatchFilters.push("dogFriendly");
      } else if(filter === "catFriendly") {
          mustMatchFilters.push("catFriendly");
      } else if(filter === "coffee") {
          mustMatchFilters.push("coffee");
          // mustNotMatch.push("noCoffee");
      } else if(filter === "noCoffee") {
          mustNotMatchFilters.push("coffee");
      } else if(filter === "alcohol") {
          mustMatchFilters.push("alcohol");
          // mustNotMatch.push("noAlcohol");
      } else if(filter === "noAlcohol") {
          mustNotMatchFilters.push("alcohol");
      } else if(filter === "outdoors") {
          mustMatchFilters.push("outdoors");
          mustNotMatchFilters.push("indoors");
      } else if(filter === "indoors") {
          mustMatchFilters.push("indoors");
          mustNotMatchFilters.push("outdoors");
      };
    };
  };
  return {mustMatchFilters, mustNotMatchFilters};
};

app.listen(port, ()=>{
  console.warn("Listening on " + port);
});
