var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(users);
  })
  .catch((err)=>next(err));
});

router.post('/', (req, res, next) => {
  User.findOne({email: req.body.email})
  .then((user) => {
    if(user!=null) {
      var err = new Error('User already exists with email: '+req.body.email);
      err.statusCode = 403;
      next(err);
    }else {
      return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        profileImg: req.body.profileImg
      });
    }
  })
  .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'User Created', user: user});
  },(err)=>next(err))
  .catch((err)=>next(err));
});

router.put('/:email', (req, res, next)=> {
  User.findOne({email: req.params.email},
    {$set: req.body}, {new: true})
  .then((user)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dish);
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.delete('/', (req, res, next)=>{
  User.deleteMany({})
  .then((resp) => {
    console.log('removed all dishes');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
},(err)=>next(err))
.catch((err)=>next(err));
});

router.delete('/:email', (req, res, next)=>{
  User.findOne({email: req.params.email})
  .then((user) => {
    user.remove();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dish);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
