var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));
module.exports = router;
/*
 * GET home page.
 */
 
router.get('/', function(req, res, next) {
	console.log("index.js");
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.post('/api/v1/sulamakse', function(req, res) {

  var results =[]
    // Grab data from http request
    var data = {partner: req.body.partner, summa: req.body.summa, kpv: req.body.kpv, selgitus: req.body.selgitus};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

      var insert =   client.query("select * from sulamakse($1, $2, $3, $4)", [data.partner, data.summa, data.kpv, data.selgitus]);
	return res.json(results);
	});
});

router.get('/api/v1/pangaliikumised/', function(req, res) {
    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT *  FROM pank_valja");

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

router.post('/api/v1/sisestapank/', function(req, res) {
	
    spawn = require('child_process').spawn,
    ls    = spawn('python', ['C:\\Users\\marten\\code\\aws\\minuapp\\app\\routes\\test2.py']);
    ls    = spawn('python', ['routes\\test2.py']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data.toString());
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data.toString());
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});	
	
});
router.put('/api/v1/muudasaaja', function(req, res) {

  var results =[]
    // Grab data from http request
    var data = {saaja: req.body.saaja, pank_id: req.body.pank_id};

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
        client.query("UPDATE PANK SET saaja = $1 where pank_id = $2", [data.saaja, data.pank_id]);
    return res.json(results);
	});
});



router.get('/api/v1/sulaliikumised/', function(req, res) {
    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT kpv, partner, summa, selgitus  FROM pank where tyyp = 'sula' order by kpv desc");

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
router.get('/api/v1/sula/', function(req, res) {
    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT coalesce(sum(summa),0) as sula FROM pank where tyyp = 'sula'");

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
router.get('/api/v1/pangas/', function(req, res) {

    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT coalesce(sum(summa),0) as pangas FROM pank where tyyp = 'pank'");

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
router.get('/api/v1/makskpv/', function(req, res) {
    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT max(kpv) from pank where tyyp='pank'");

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
router.get('/api/v1/ette/', function(req, res) {

    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT coalesce(sum(saldo),0) as ette FROM saldo where saldo>0");

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
router.get('/api/v1/lvolad/', function(req, res) {
    var results = [];
  
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT coalesce(sum(saldo),0) as lvolad FROM saldo where saldo<0");

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
router.delete('/api/v1/nouded/:nouded_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var nouded_id = req.params.nouded_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM nouded WHERE nouded_id=($1)", [nouded_id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM nouded order by nouded_id asc");

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
router.post('/api/v1/noue', function(req, res) {

  var results =[]
    // Grab data from http request
    var data = {maksja: req.body.maksja, summa: req.body.summa, kaup: req.body.kaup, tekkekpv: req.body.tekkekpv};

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
        client.query("INSERT INTO nouded(maksja, summa, kaup, tekkekpv) values($1, $2, $3, $4)", [data.maksja, data.summa, data.kaup, data.tekkekpv]);
    return res.json(results);
	});
});
router.post('/api/v1/sulalaekumine', function(req, res) {

  var results =[];
  var mid_results=[];
    var source = req.body.source ; 
	// Grab data from http request
	if (source == 'liige')
    {var saaja = parseInt(req.body.saaja);}
	else if (source == 'other')
	{var partner = req.body.partner;}
	var summa = req.body.summa;
	var kpv = req.body.kpv;
	var selgitus = req.body.selgitus;

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
	  if (saaja)
      {var query =   client.query("select * from loo_sulalaekumine($1, $2, $3, $4)", [saaja, summa, kpv, selgitus]);}
	else if (partner)
	{var query =   client.query("select * from loo_sulalaekumine($1, $2, $3, $4, $5)", [-2, partner, summa, kpv, selgitus]);}
	  console.log("Insert");
	  console.log(query);
	  console.log("isnert done");

	  // Stream results back one row at a time
		query.on('row', function(row){
		results.push(row);	
		}
        );
			
        // After all data is returned, close connection and return results
        query.on('end', function() {
		console.log("sent results");
		console.log(results);
		return res.json(results);

        });
	});
});
router.get('/api/v1/nouded/:maksja', function(req, res) {

    var results = [];
    var maksja_id = req.params.maksja;;

    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM nouded where maksja = $1 order by tekkekpv", [maksja_id]);

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
router.post('/api/v1/noue', function(req, res) {

  var results =[]
    // Grab data from http request
    var data = {maksja: req.body.maksja, summa: req.body.summa, kaup: req.body.kaup, tekkekpv: req.body.tekkekpv};
	console.log("data: "+data.tekkekpv)
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
        client.query("INSERT INTO nouded(maksja, summa, kaup, tekkekpv) values($1, $2, $3, $4)", [data.maksja, data.summa, data.kaup, data.tekkekpv]);
    return res.json(results);
	});
});
router.get('/api/v1/pank/:saaja', function(req, res) {

    var results = [];
    var saaja = req.params.saaja;
    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM pank where saaja = $1 order by kpv asc", [saaja]);

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
router.get('/api/v1/panksumma/:saaja', function(req, res) {
 
    var results = [];
    var saaja = req.params.saaja;

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT coalesce(sum(summa),0) as summa FROM pank where saaja = $1", [saaja]);

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
router.get('/api/v1/noudedsumma/:maksja', function(req, res) {
    var results = [];
    var maksja_id = req.params.maksja;;

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT coalesce(sum(summa), 0) as summa FROM nouded where maksja = $1", [maksja_id]);

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