AckNotificationBundle
=====================

Introduction
------------

This bundle offers a predefined architecture for a notification system using Redis and Node.js

Here is little diagram of what happen behind the scene:

![Alt text](diagram.png?raw=true "Diagram")

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

Usage
------------

```javascript
<script src="http://your.domain:1337/socket.io/socket.io.js"></script>

<script>
    if (typeof io !== 'undefined') {
        var socket = io.connect('http://your.domain:1337');
    }
</script>
```

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

```javascript
socket.on('notification', function (notification) {
    $('.notifications').append(notification);
});
```




```yaml
snc_redis:
    clients:
        default:
            type: predis
            alias: default
            dsn: redis://localhost
            logging: %kernel.debug%
```