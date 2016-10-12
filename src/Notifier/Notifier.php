<?php

namespace Ack\NotificationBundle\Notifier;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Predis\Client as RedisClient;
use Ack\NotificationBundle\Notifier\NotifierInterface;

/**
 * Notifier
 */
class Notifier implements NotifierInterface
{
    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @var RedisClient
     */
    private $redisClient;

    /**
     * NotificationManager constructor.
     */
    public function __construct(EngineInterface $templating, RedisClient $redisClient)
    {
        $this->templating  = $templating;
        $this->redisClient = $redisClient;
    }

    /**
     * Notify users
     *
     * @param string $template
     * @param array  $users
     * @param array  $parameters
     *
     * @return self
     */
    public function notify($template, $users, $parameters = array())
    {
        $content = $this->templating->render(
            $template,
            $parameters
        );

        $notification = array(
            'content' => $content,
            'users'   => json_encode($users)
        );

        $this->redisClient->publish('notification', json_encode($notification));
    }
}
