var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));
module.exports = router;

router.post('/api/v1/loo_nouded', function(req, res) {
	console.log(req);
  var results =[]
    // Grab data from http request
    var data = {student_price:req.body.student_price, price:req.body.price, kaup:req.body.kaup, kpv:req.body.kpv};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
console.log(data);
      var insert =   client.query("select * from loo_nouded ($1, $2, $3, $4)", [data.student_price, data.price, data.kaup, data.kpv]);
	console.log ("Insert into nouded done");
	console.log(insert.result);
        insert.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        insert.on('end', function() {
            done();
            return res.json(results);
        });
	});
});