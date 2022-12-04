<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/api/logout", name="app_logout")
     */
    public function logout()
    {
        $res = new Response();
        //$res->headers->setCookie(new Cookie('BEARER', null, 'max-age=-1', '/', null, null, true));
        $res->setContent(json_encode(['message' => 'Logged out']));
        $res->setStatusCode(Response::HTTP_OK);
        $res->headers->clearCookie('BEARER', '/', null, false, true);
        $res->headers->set('Content-Type', 'application/json');
        $res->send();
    }
}
