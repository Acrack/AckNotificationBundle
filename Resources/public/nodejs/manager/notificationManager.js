function NotificationManager() {
    if (notificationManager) {
        return notificationManager;
    }

    notificationManager = this;

    this.notify = function (io, socketId, notification) {
        io.to(socketId).emit('notification', notification);
    }

    this.notifyAll = function (io, notification) {
        io.sockets.emit('notification', notification);
    }
}

// Singleton NotificationManager
var notificationManager = new NotificationManager();
module.exports          = notificationManager;
