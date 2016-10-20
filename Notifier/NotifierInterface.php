<?php

namespace Ack\NotificationBundle\Notifier;

/**
 * NotifierInterface
 */
interface NotifierInterface
{
    /**
     * Notify users
     *
     * @param string $template
     * @param mixed  $users
     * @param array  $parameters
     *
     * @return self
     */
    public function notify($template, $users, $parameters = array());
}
