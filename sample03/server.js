// server.js

// BASE SETUP
// Import balíčků které budeme využívat
var express    = require('express'); 
var bodyParser = require('body-parser');

var suklData = require('./sukl-data');

// Webova aplikace
var app  = express(); 

// Webova sluzba (podaplikace)
var service = express();

// Konfigurace aplikace configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

service.use(bodyParser.urlencoded({ extended: true }));
service.use(bodyParser.json());

// nastaveni portu na ktere aplikace a sluzba prijima HTTP pozadavky
var port = process.env.PORT || 3001;        

app.use(express.static(__dirname));

// ROUTES pro webovou aplikaci
app.get('/', function(req, res) {
    res.sendFile('index.html' , { root : __dirname});
});

app.get('/seznam', function(req, res) {
    res.sendFile('hlaseni-seznam.html' , { root : __dirname});
});

app.get('/nove', function(req, res) {
    res.sendFile('hlaseni-nove.html' , { root : __dirname});
});

// ROUTES pro REST webovou sluzbu
service.get('/', function (req, res) {
  res.json({ zprava: 'GET Response!' });
});

service.post('/', function (req, res) {
  res.json({ zprava: 'POST Response!' });
});

service.get('/hlaseni', function (req, res) {
    suklData.vratHlaseniSeznam(function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

service.post('/hlaseni', function (req, res) {
    suklData.vratHlaseniSeznam(function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

service.post('/hlaseni/add', function (req, res) {
  res.json({ zprava: 'POST Response!' });
});

service.get('/hlaseni/:id', function (req, res) {
    var id = req.params.id;
    suklData.vratHlaseni(id, function(error, result){
        if(error){
            res.json({ zprava: 'ERROR', data: {} });
        }
        else{
            res.json({ zprava: 'OK', data: result });
        }
    });
});

service.delete('/hlaseni/:id', function (req, res) {
    var id = req.params.id;
    suklData.vymazHlaseni(id, function(error, result){
        if(error){
            res.json({ zprava: 'ERROR', data: {} });
        }
        else{
            res.json({ zprava: 'OK', data: result });
        }
    });
});

service.put('/hlaseni/:id', function (req, res) {
    var id = req.params.id;
  res.json({ zprava: 'PUT Response!' });
});

// REGISTRACE ROUTES 
// Prefix pro vsechna volani /sukl
app.use('/sukl', service);

// START SERVERu
app.listen(port);
console.log('Server bezi na portu ' + port);