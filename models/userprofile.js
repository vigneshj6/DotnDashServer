'use strict';
module.exports = (sequelize, DataTypes) => {
/**
 * @typedef UserProfile
 * @property {string} userId.required
 * @property {string} password.required 
 * @property {string} permissionId
 * @property {string} status.required
 * @property {date} effectiveFromDate.required
 * @property {date} effectiveTillDate
 * @property {string} emailId.required
 * @property {string} phoneNumber
 */
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