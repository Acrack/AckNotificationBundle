var
    core         = require('../core'),
    redis        = require('redis'),
    redisManager = require('../manager/redisManager');

module.exports = {
    loaded: function (socket, user) {
        'use strict';

        var appUser = {
            id           : user.id,
            socket_id    : socket.id,
            last_refresh : (new Date()).getTime()
        };

        redisManager.deleteUserKeys("user:" + user.id + "_*");

        redisManager.addUser("user:" + appUser.id + "_" + appUser.socket_id, appUser);
    },
    disconnect: function (socket) {
        redisManager.deleteUserKeys("user:[0-9]*" + "_" + socket.id);
    }
};

