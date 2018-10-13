'use strict';
module.exports = (sequelize, DataTypes) => {
  var RegistrationLink = sequelize.define('RegistrationLink', {
    UserID: DataTypes.STRING,
    LinkID: DataTypes.STRING
  }, {});
  RegistrationLink.associate = function(models) {
    // associations can be defined here
  };
  return RegistrationLink;
};