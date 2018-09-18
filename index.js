var express = require("express");
var path = require("path");
var mongo = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var helmet = require('helmet');
var db = require("./config.js");

var app = express();
var port = process.env.port || 7777;

var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));
app.use(helmet());

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var prestamoSchema = new Schema({
    material: { type: String   },
    nombre: { type: String   },
    codigo: { type: String   },
    email: { type: String },
    documento: { type: String },
    fecha: { type: String },
},{ versionKey: false });

var connection = mongoose.createConnection('mongodb://usuario1:usuario2@ds259912.mlab.com:59912/bancolibrosmateriales');
var model = connection.model('prestamos', prestamoSchema);

//var model = mongoose.model('prestamos', prestamoSchema, 'prestamos');

//api for get data from database
app.get("/api/getPrestamo",function(req,res){
 model.find({},function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send(data);
                }
        });
})

//api for Delete data from database
app.post("/api/removePrestamo",function(req,res){
 model.remove({ _id: req.body.id }, function(err) {
            if(err){
                res.send(err);
            }
            else{
                   res.send({data:"Record has been Deleted..!!"});
               }
        });
})

//api for Update data from database
app.post("/api/UpdatePrestamo",function(req,res){
 model.findByIdAndUpdate(req.body.id, { name:  req.body.name, address: req.body.address, contact: req.body.contact,email:req.body.email },
function(err) {
 if (err) {
 res.send(err);
 return;
 }
 res.send({data:"Record has been Updated..!!"});
 });
})


//api for Insert data from database
app.post("/api/savePrestamo",function(req,res){

    var mod = new model(req.body);
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                 res.send({data:"Record has been Inserted..!!"});
            }
        });
})

// call by default registroPrestamos.html page
app.get("*",function(req,res){
    res.sendFile(srcpath +'/registroPrestamos.html');  
})

//server stat on given port
app.listen(port,function(){
    console.log("server start on port"+ port);
})
