AckNotificationBundle
=====================

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


```javascript
<script src="http://flash.com.local:1337/socket.io/socket.io.js"></script>

<script>
    if (typeof io !== 'undefined') {
        var socket = io.connect('http://flash.com.local:1337');
    }
</script>

<script src="{{ asset('js/jquery.min.js') }}"></script>
```

```twig
{% if app.user is not null %}
    <script>
        var userId = {{ app.user.id }};

        $(function () {
            socket.emit('loaded', {
                id        : userId,
                sessionId : '{{ app.session.id }}',
            });
        })
    </script>

    <script src="{{ asset('js/notification.js') }}"></script>
{% endif %}
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