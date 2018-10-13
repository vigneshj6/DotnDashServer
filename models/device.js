'use strict';
module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    macaddr: DataTypes.STRING,
    deviceName: DataTypes.STRING,
    topicName: DataTypes.STRING,
    template: DataTypes.STRING
  }, {});
  Device.associate = function(models) {
    // associations can be defined here
  };
  return Device;
};