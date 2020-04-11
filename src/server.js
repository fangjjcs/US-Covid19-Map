const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv';

// let myHeaders = new Headers({
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'text/plain'
// });

var fetch = require('node-fetch');

var api_url = url;

var data;

fetch(api_url, {})
  .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    
    //console.log("fetch");
    //console.log(typeof response);
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    return response.text();
  }).then((textData) => {
    console.log(typeof textData);
  }).catch((err) => {
    console.log('錯誤:', err);
  });

console.log(data);
app.get('/ping', function (req, res) {
 return res.send({express:'hello'});
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000);