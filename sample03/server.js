/**
 * SUKL demo aplikacni server a REST webova sluzba.
 * 
 * server.js
 * 13.04.2016
 */

//
// BASE SETUP
//
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

//
// ROUTES pro webovou aplikaci
//
// Nacteni domovske stranky aplikace
app.get('/', function(req, res) {
    res.sendFile('index.html' , { root : __dirname});
});

// Nacteni stranky pro zobrazeni evidovanych hlaseni
app.get('/seznam', function(req, res) {
    res.sendFile('hlaseni-seznam.html' , { root : __dirname});
});

// Nacteni stranky pro zalozeni noveho hlaseni
app.get('/nove', function(req, res) {
    res.sendFile('hlaseni-nove.html' , { root : __dirname});
});

//
// ROUTES pro REST webovou sluzbu
//
// Testovaci GET pozadavek
service.get('/', function (req, res) {
  res.json({ zprava: 'GET Response!' });
});

// Testovaci POST pozadavek
service.post('/', function (req, res) {
  res.json({ zprava: 'POST Response!' });
});

// GET pozadavek na nacteni seznamu aktivnich hlaseni
service.get('/hlaseni', function (req, res) {
    suklData.vratHlaseniSeznam(function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

// POST pozadavek na ulozeni noveho hlaseni
service.post('/hlaseni', function (req, res) {
    var hlaseni = req.body;
    suklData.ulozHlaseni(hlaseni, function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

// PUT pozadavek na obnoveni seznamu hlaseni
service.put('/hlaseni', function (req, res) {
    suklData.obnovHlaseniSeznam(function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

// Pozadavek na nacteni hlaseni podle systemoveho ID
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

// Pozadavek na vymazani hlaseni 
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

// Pozadavek na update hlaseni 
service.put('/hlaseni/:id', function (req, res) {
    var id = req.params.id;
  res.json({ zprava: 'PUT Response!' });
});

// REGISTRACE ROUTES pro REST webovou sluzbu
// Prefix pro vsechna volani /sukl
app.use('/sukl', service);

// START SERVERu
app.listen(port);
console.log('Server bezi na portu ' + port);