var
    notificationManager = require('../manager/notificationManager'),
    userActions         = require('../action/userAction'),
    redis               = require('redis'),
    redisClient         = redis.createClient();
    redisSubClient      = redis.createClient();

function NotificationListener() {
    if (notificationListener) {
        return notificationListener;
    }

    notificationListener = this;

    this.getSocketActions = function () {
        var socketActions = {};

        for (var property in userActions) {
            if (userActions.hasOwnProperty(property)) {
                socketActions[property] = userActions[property];
            }
        }

        return socketActions;
    };

    this.listen = function (io) {
        'use strict';

        redisSubClient.subscribe("notification");

        redisSubClient.on("message", function (channel, message) {
            var notification = JSON.parse(message);

            if (notification.users === '*') {
                notificationManager.notifyAll(io, notification.content);
            } else {
                var users = JSON.parse(notification.users);

                for (var i in users) {
                    redisClient.keys("user:" + users[i] + "_\/#*", function(err, keys) {
                        for (var key in keys) {
                            var userKey = keys[key];

                            redisClient.hgetall(userKey, function(err, user) {
                                notificationManager.notify(io, user.socket_id, notification.content);
                            });
                        }
                    });
                }
            }
        });
    };
}

// Singleton NotificationListener
var notificationListener = new NotificationListener();
module.exports           = notificationListener;
