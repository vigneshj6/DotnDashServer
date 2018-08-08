var { Validator, ValidationError } = require('express-json-validator-middleware');
var validator = new Validator({allErrors: true});
var loginInfo = {
    type: 'object',
    required: ['userId', 'password'],
    properties: {
        userId : {
            type: 'string'
        },
        password:{
            type: 'string'
        }
    }
};
var userReference = {
    type: 'object',
    required: ['userId'],
    properties: {
        userId : {
            type: 'string'
        }
    }
};
var utils = {
    validate : validator.validate,
    LoginInfo : loginInfo,
    UserReference : userReference
};
module.exports = utils;