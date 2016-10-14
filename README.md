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

Usage
------------

```php
$this->get('ack.notifier')->notify(
    ':notification:test.html.twig', // Any twig file
    array(1, 2, 3), // Array of the users id that need to be notified
    array() // Optional parameters according the your twig view
);
```

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