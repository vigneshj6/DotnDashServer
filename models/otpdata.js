'use strict';
module.exports = (sequelize, DataTypes) => {
  var OTPData = sequelize.define('OTPData', {
    UserId: DataTypes.STRING,
    OTP: DataTypes.STRING,
    RequestedOn: DataTypes.STRING,
    RouteType: DataTypes.STRING,
    RouteId: DataTypes.STRING
  }, {});
  OTPData.associate = function(models) {
    // associations can be defined here
  };
  OTPData.getOTPData = function(){

  };
  OTPData.setOTPData = function(otpDataObj){
    return OTPData.create(otpDataObj);
  };
  return OTPData;
};