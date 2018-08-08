'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserProfile = sequelize.define('UserProfile', {
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    permissionId: DataTypes.STRING,
    status: DataTypes.STRING,
    effectiveFromDate: DataTypes.DATE,
    effectiveTillDate: DataTypes.DATE,
    emailId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});
  UserProfile.associate = function(models) {
    // associations can be defined here
  };
  return UserProfile;
};