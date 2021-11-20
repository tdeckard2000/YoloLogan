const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/yoloLogan'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/yoloLogan/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, ()=>{
  console.warn("Listening on port " + port);
});

console.log(process.env.GOOGLE_API_KEY)
