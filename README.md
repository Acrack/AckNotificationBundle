AckNotificationBundle
=====================

Introduction
------------

This bundle offers a predefined architecture for a notification system using Redis and Node.js

Here is simple diagram of what happen behind the scene:

![Alt text](diagram.png?raw=true "Diag")

Each messages contains a content rendered by twig and an array of the users id.

Installation
------------

Use composer :

    php composer.phar require ack/notification-bundle

Register the bundle in your app/AppKernel.php file :

    $bundles = array(
        ...
        new Ack\NotificationBundle\AckNotificationBundle(),
        ...
    );

If you already have a server node running on your application you have an example of implementation in example_server.js

Else, after the assets install, you can go in /web/bundles/acknotification/nodejs and:

    npm install

    node server.js

Usage
------------

From a controller or anywhere you have access to the 'ack.notifier' service:

```php
$this->get('ack.notifier')->notify(
    ':notification:test.html.twig', // Any twig file
    array(1, 2, 3), // Array of the users id that need to be notified
    array() // Optional parameters according the your twig view
);
```
Do not forget to load socket.io.js and connect to the server.

```javascript
<script src="http://your.domain:1337/socket.io/socket.io.js"></script>

<script>
    if (typeof io !== 'undefined') {
        var socket = io.connect('http://your.domain:1337');
    }
</script>
```

After you have emitted the 'loaded' event from your frontend, Node.js will catch it and store your user in a Redis hash.
That way we have a list of the online users somewhere and each hash contains the socketId.

```twig
{% if app.user is not null %}
    <script>
        socket.emit('loaded', {
            id        : '{{ app.user.id }}',
            sessionId : '{{ app.session.id }}',
        });
    </script>
{% endif %}
```
Once Node.js receive a notification, you can do that kind of script in your front end.

```javascript
socket.on('notification', function (notification) {
    $('.notifications').append(notification);
});
```
This bundle has a dependency on snc redis, so do not forget to add this on your config.yml
I recomend using redis for your other needs such as session storing, caching, logging and more here: [a link](https://github.com/snc/SncRedisBundle)

```yaml
snc_redis:
    clients:
        default:
            type: predis
            alias: default
            dsn: redis://localhost
            logging: %kernel.debug%
```