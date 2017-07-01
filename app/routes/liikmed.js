var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));
module.exports = router;

router.post('/api/v1/liikmed', function(req, res) {

  var results =[]
    // Grab data from http request
    var data = {liikme_status: req.body.liikme_status, type: req.body.type, firstname: req.body.firstname, lastname: req.body.lastname};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

      var insert =   client.query("insert into liikmed (status, type, lastname, firstname) values ($1, $2, $3, $4) returning id ", [data.liikme_status, data.type, data.lastname, data.firstname]);
	console.log ("Insert into liikmed done");
	console.log(insert);
	return res.json(results);
	});
});

router.get('/api/v1/liikmed/', function(req, res) {

    var results = [];
    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM liikmed order by lastname, firstname asc");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/api/v1/liikmed/:liikmed_id', function(req, res) {

    var results = [];
    var liikmed_id = req.params.liikmed_id;;

    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM liikmed where id = $1", [liikmed_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/api/v1/types/', function(req, res) {

    var results = [];
    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM types");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/api/v1/statuses/', function(req, res) {

    var results = [];
    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM statuses");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});
router.put('/api/v1/liikmed', function(req, res) {

  var results =[]
    // Grab data from http request
	console.log(req.body);
	var data = {status: req.body.status, type: req.body.type, firstname: req.body.firstname, lastname: req.body.lastname, id:req.body.maksja};


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
       //console.log(("INSERT INTO excluded(id, word) values(3, $1)", [word]))
        client.query("UPDATE liikmed SET firstname = $1, lastname = $2, status=$3, type=$4  where id = $5", [data.firstname, data.lastname, data.status, data.type, data.id]);
    return res.json(results);
	});
});