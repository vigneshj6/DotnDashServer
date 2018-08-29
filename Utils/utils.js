var { Validator, ValidationError } = require('express-json-validator-middleware');
var nodemailer = require('nodemailer');
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
var mailerFunc = function(cred,from,to,subject,content){
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: cred.user,
                pass: cred.pass 
            }
        });
    
        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: content
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    });

};

var utils = {
    validate : validator.validate,
    LoginInfo : loginInfo,
    UserReference : userReference,
    mailer : mailerFunc
};
module.exports = utils;