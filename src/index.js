// console.log('Happy Code');
require('dotenv').config();
// const express = require('express');
// const port = process.env.PORT || 9900;
// const app = express();

// app.listen(port,function(){
//     console.log('Express server in port ' + port);
// });
const app = require('../app');
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});