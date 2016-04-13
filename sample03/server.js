// server.js

// BASE SETUP
// Import balíčků které budeme využívat
var express    = require('express');        // call express
var bodyParser = require('body-parser');

var suklData = require('./sukl-data');

// Hlavni aplikace
var app  = express();  // define our app using express
var admin = express(); // the sub app

// Konfigurace aplikace configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

admin.use(bodyParser.urlencoded({ extended: true }));
admin.use(bodyParser.json());

var port = process.env.PORT || 3001;        // nastaveni portu

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile('index.html' , { root : __dirname});
});

app.get('/seznam', function(req, res) {
    res.sendFile('hlaseni-seznam.html' , { root : __dirname});
});

app.get('/nove', function(req, res) {
    res.sendFile('hlaseni-nove.html' , { root : __dirname});
});

admin.get('/', function (req, res) {
  res.json({ zprava: 'GET Response!' });
});

admin.post('/', function (req, res) {
  res.json({ zprava: 'POST Response!' });
});


admin.get('/hlaseni', function (req, res) {
    suklData.vratHlaseniSeznam(function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

admin.post('/hlaseni', function (req, res) {
    suklData.vratHlaseniSeznam(function(error, result){
        res.json({ zprava: 'OK', data: result });
    });
});

admin.post('/hlaseni/add', function (req, res) {
  res.json({ zprava: 'POST Response!' });
});

admin.get('/hlaseni/:id', function (req, res) {
    var id = req.params.id;
    suklData.vratHlaseniDetail(id, function(error, result){
        if(error){
            res.json({ zprava: 'ERROR', data: {} });
        }
        else{
            res.json({ zprava: 'OK', data: result });
        }
    });
  
});
admin.delete('/hlaseni/:id', function (req, res) {
    var hlaseniID = req.params.id;
  res.json({ zprava: 'DELETE Response!' });
});
admin.put('/hlaseni/:id', function (req, res) {
    var hlaseniID = req.params.id;
  res.json({ zprava: 'PUT Response!' });
});

// more routes for our API will happen here
// router.route('/seznam/hlaseni')

//     // create a bear (accessed at POST http://localhost:<port>/api/bears)
//     .get(function(req, res) {
//         res.json({ message: 'GET Response!' });
//     });
    
// router.route('/seznam/hlaseni')

//     // create a bear (accessed at POST http://localhost:<port>/api/bears)
//     .post(function(req, res) {
//         res.json({ message: 'POST Response!' });
//     });
    
   
// REGISTRACE ROUTES 
// Prefix pro vsechna volani /api
//app.use('/', router);
app.use('/sukl', admin);

// START SERVERu
app.listen(port);
console.log('Server bezi na portu ' + port);