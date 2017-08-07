var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));
module.exports = router;


router.post('/api/v1/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let sampleFile = req.files[Object.keys(req.files)[0]];
  var csv = require('csv-parser');
var fs = require('fs');
var resp=[];
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('C:/Users/marten/code/nodetest/temp.csv', function(err) {
    if (err)
      return res.status(500).send(err);
 
   // res.send('File uploaded!');
  });
  
  fs.createReadStream('C:/Users/marten/code/nodetest/temp.csv')
  .pipe(csv({quote: '"'}))
  .on('data', function (data) {
	console.log(data);
	resp.push(data);
    //console.log('Name: %s Age: %s', data.NAME, data.AGE)
  })
  .on('end', function () {
    console.log(resp);
	res.json(resp);
}  )
  
  //res.json([{ "name":"John", "age":30, "car":null },{ "name":"John", "age":30, "car":null }]);
});

router.post('/api/v1/liikmed', function(req, res) {
	console.log(req.body);
	var results =[] ;
	var return_id;
	// Grab data from http request
    var data = {liikme_status: req.body.status, type: req.body.type, firstname: req.body.firstname, lastname: req.body.lastname};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

      var query =   client.query("insert into liikmed (status, type, lastname, firstname) values ($1, $2, $3, $4) returning id ", [data.liikme_status, data.type, data.lastname, data.firstname]);
	console.log ("Insert into liikmed done");
	
	 query.on("row", function (row, result) {
    result.addRow(row);
    });

    function  returnInsertedRow (data, callback) {query.on("end", function (result) {
	return_id = (result.rows[0].id);
	done();
	callback(null, return_id);
})
	}
	
	returnInsertedRow(data, function(err, content) {
    if (err) {
        console.log(err);
        // Do something with your error...
    } else {
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
				var query = client.query("SELECT firstname, lastname, status, type FROM liikmed where id=  $1", [content]);

				// Stream results back one row at a time
				query.on('row', function(row) {
					console.log(row);
					results.push(row);
				});

				// After all data is returned, close connection and return results
				query.on('end', function() {
					done();
					
					return res.json(results);
				});

			});
    }
});
	

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