var mongo = require("mongoose");
//var db = mongo.connect("mongodb://localhost:27017/bancoLibros", function(err,response)
var db = mongo.connect('mongodb://usuario1:usuario2@ds259912.mlab.com:59912/bancolibrosmateriales', function(err,response)
{
  if(err){console.log('Failed to connect to' + db);}
  else{ console.log('Connected to '+ db, ' + ', response);  }
});

module.exports = db;
