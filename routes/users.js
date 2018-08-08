var express = require('express');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt');

//Salt Should be changed for production
var salt = 8;

var router = express.Router();
var UserSession = require('../models').UserSession;
var UserProfile = require('../models').UserProfile;
var uuid = require('node-uuid');
var Utils = require('../Utils/utils');
/**
 * @typedef LoginInfo
 * @property {string} userId.required
 * @property {string} token.required
 */
/**
 * @route POST /users/login
 * @group User - Operations about user
 * @param {UserProfile.model} userprofile.body.required - Input
 * @returns {LoginInfo.model} 200 - Login info
 * @returns {Error}  default - Unexpected error
 */
router.post('/login',Utils.validate({body: Utils.LoginInfo}), function(req, res) {
  console.log(bcrypt.hashSync(req.body.password,salt));
  UserProfile.findAll({
    where: {
      userId: req.body.userId
    }
  }).then(
    function(val){
      var generatedToken = uuid.v4();
      if(val.length && bcrypt.compareSync(req.body.password,val[0].dataValues.password)){
        UserSession.create(
          {
            "userId": "admin",
            "token": generatedToken,
            "permissionId": "admin"
          }
        )
        .then(
          function(val)
          {
            console.dir(val);      
            res.send({"userId":val.dataValues.userId,"token":generatedToken})
          }
        )
      }
      else
        res.send(400);
    }
  );
});

router.post('/logout',Utils.validate({body: Utils.UserReference}), function(req, res) {
  
  UserProfile.findAll({
    where: {
      userId: req.headers.internal.userId
    }
  }).then(
    function(val){
      if(val.length)
      UserSession.destroy({
            where: {
              token : req.headers.internal.token
            }
        })
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      else
        res.send(400);
    }
  );
});

/**
 * @route POST /users
 * @group User - Operations about user
 * @param {UserProfile.model} userprofile.body.required - Input
 * @returns {UserProfileReference.model} 200 - Reference info
 * @returns {Error}  default - Unexpected error
 */
router.post('/',function(req,res){
  req.body.password = bcrypt.hashSync(req.body.password,salt);
  console.log(req.body.password);
  UserProfile.create(req.body).then(
    function(val)
    {
      res.send({"userId":val.dataValues.userId});
    }
  );
});

/**
 * @route GET /users
 * @group User - Operations about user
 * @returns {UserProfile.model} 200 - List of UserProfile
 * @returns {Error}  default - Unexpected error
 */
router.get('/',function(req,res){
  UserProfile.findAll().then(
    function(val)
    {
      res.send(val);
    }
  );
});
router.put('/',function(req,res){

  UserProfile.update(req.body).then(
    function(val)
    {
      res.send(val);
    }
  );
});
  
module.exports = router;
