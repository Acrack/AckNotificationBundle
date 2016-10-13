var
    redis       = require('redis'),
    redisClient = redis.createClient();

function RedisManager() {
    if (redisManager) {
        return redisManager;
    }

    redisManager = this;

    this.addUser = function (key, user) {
        redisClient.HMSET(key, user, function(err, res) {

        });
    }

    this.deleteUserKeys = function (regexKey) {
        redisClient.keys(regexKey, function(err, keys) {
            redisClient.del(keys, function(err, res) {

            });
        });
    }
}

// Singleton RedisManager
var redisManager = new RedisManager();
module.exports   = redisManager;
