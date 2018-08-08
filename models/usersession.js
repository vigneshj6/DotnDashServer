'use strict';
/**
 * @typedef UserSession
 * @property {string} userId.required
 * @property {string} token.required - Some description for product
 * @property {string} permissionId
 */
module.exports = (sequelize, DataTypes) => {
  var UserSession = sequelize.define('UserSession', {
    userId: DataTypes.STRING,
    token: DataTypes.STRING,
    permissionId: DataTypes.STRING
  }, {});
  UserSession.associate = function(models) {
    // associations can be defined here
  };
  UserSession.getByUserId = function(usrId){
    return UserSession.findAll({
      where: {
        userId: usrId
      }
    });
  }
  UserSession.getBySessionToken = function(sessToken){
    return UserSession.findAll({
      where: {
        token: sessToken
      }
    });
  }
  return UserSession;
};