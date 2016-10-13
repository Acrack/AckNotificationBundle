var
    nconf                = require('nconf'),
    http                 = require('http'),
    color                = require('colors'),
    io                   = require('socket.io'),
    util                 = require('util'),
    notificationListener = require('./listener/notificationListener');

function Core() {
    if (core) {
        return core;
    }

    nconf.file('config', __dirname+'/config/config.json');

    this.config   = nconf;
    this.messages = [];

    core = this;

    this.prepareSocketIO = function () {
        server = http.createServer();
        io     = io.listen(server);

        io.on('connection', function (socket) {
            'use strict';

            var socketActions = notificationListener.getSocketActions();

            for (var action in socketActions) {
                if (socketActions.hasOwnProperty(action)) {
                    socket.on(action, socketActions[action].bind(socketActions, socket));
                }
            }
        });
    };

    this.startSocketIO = function () {
        server.listen(nconf.get('network:port'), nconf.get('network:ip'));

        server.once('listening', function () {
            core.writeLog('Socket.io listening on ' + nconf.get('network:ip') + ':' + nconf.get('network:port'), 'success');

            notificationListener.listen(io);
        });
    };

    this.writeLog = function(message, type) {
        var type = typeof type === 'undefined' ? null : type;

        if (core.config.get('config:verbose')) {
            if (type === 'success') {
                console.log(color.italic.green(message));
            } else if (type === 'error') {
                console.log(color.italic.red(message));
            } else if (type === 'notice') {
                console.log(color.italic.yellow(message));
            } else if (type === 'info') {
                console.log(color.italic.blue(message));
            } else if (type === 'default') {
                console.log(color.italic(message));
            } else {
                console.log(color.italic(message));
            }
        }
    };

    this.dump = function(object, error) {
        if (core.config.get('config:trace')) {
            if (typeof error == "undefined") {
                console.log(util.inspect(object, false, null));
            } else {
                if (error === true) {
                    console.log(color.italic.red(util.inspect(object, false, null)));
                } else {
                    console.log(util.inspect(object, false, null));
                }
            }
        }
    };
}

// Singleton Core
var core = new Core();
module.exports = core;
