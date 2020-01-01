const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer')
const mongoose = require('mongoose');
const PORT = 4000;
let Users = require('./crud.model');
const crudRoutes = express.Router();
var fs = require('fs');


app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/crud', {useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})






//getting all users on homepage
crudRoutes.route('/').get(function(req,res){
    Users.find(function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users)
        }
    });
});

//getting users by specific id
crudRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Users.findById(id,function(err,users){
        if(err){
            console.log(err)
        }else{
            res.json(users)
        }
    });
});

//adding new users
crudRoutes.route('/add').post(function(req,res){
    let users = new Users(req.body);
    users.save(function(err,user){
        if(err){
            res.status(400).send("adding new users failed");
        }else{
            const id = user.id;
            res.status(200).json({
                'users':'users added successfully!!!' ,
                'userId' : id
            });
        }
    });
  


});

//uploading profile picture

crudRoutes.route('/upload/:id').post(function(req,res){
    var fileName = "default";
    var idToFind = req.params.id;




    //multer instance

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    var dir = '../public/files';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {


    fileName = "server" + '-'+ Date.now() + "-" + file.originalname  ;
    cb(null, "server" + '-'+ Date.now() + "-" + file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')
    

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }else{
            
            Users.updateMany(
            {_id : idToFind},
            {files: fileName},
        
            function(err,result){
                if(!result){
                    res.status(404).send("data is not found!!!");
                }else{
                    // res.status(200).send("profile picture uploaded successfully")
                    return res.status(200).send("Adding Operation Done");
                }
            })
            
        }
        
    
   

 })


})

//profile pic update

crudRoutes.route('/uploadEdit/:id').post(function(req,res){
    var fileName = "default";
    var idToFind = req.params.id;




    //multer instance

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    var dir = '../public/files';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {


    fileName = "server" + '-'+ Date.now() + "-" + file.originalname  ;
    cb(null, "server" + '-'+ Date.now() + "-" +  file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')
    

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }else{
            
            Users.updateMany(
            {_id : idToFind},
            {files: fileName},
        
            function(err,result){
                if(!result){
                    res.status(404).send("data is not found!!!");
                }else{
                    // res.status(200).send("profile picture uploaded successfully")
                    return res.status(200).send("Adding Operation Done");
                }
            })
            
        }
        
    
   

 })


})

//updating user based on id

crudRoutes.route('/update/:id').post(function(req,res){
    Users.findById(req.params.id, function(err,users){
        if(!users){
            res.status(404).send("data is not found!!!");
        }else{
            users.username = req.body.username;
            users.name = req.body.name;
            users.password = req.body.password;
            users.address = req.body.address;

            users.save()
            .then(users => {
                res.json("User Updated!!!");
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

//deleting user

crudRoutes.route('/delete/:id').delete(function(req,res){
    const _id = req.params.id;
    Users.findOneAndRemove({ _id }, (err, users) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!users) {
          res.status(404).json('User not found.');
        }
        res.json("User Deleted");
      });
  
    });

app.use('/crud', crudRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
