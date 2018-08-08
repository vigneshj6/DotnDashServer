var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();
var UserSession = require('../models').UserSession;
var UserProfile = require('../models').UserProfile;
var uuid = require('node-uuid');
var Utils = require('../Utils/utils');
/* GET users listing. */
/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @returns {UserSession} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/login',Utils.validate({body: Utils.LoginInfo}), function(req, res) {
  
  UserProfile.findAll({
    where: {
      userId: req.body.userId
    }
  }).then(
    function(val){
      var generatedToken = uuid.v4();
      if(val.length)
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

router.post('/',function(req,res){
  UserProfile.create(req.body).then(
    function(val)
    {
      res.send(val);
    }
  );
});
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
