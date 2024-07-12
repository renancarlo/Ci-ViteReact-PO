<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->resource('UserController');
$routes->get('/csrf-token', 'CsrftokenController::index');
// auth controller
$routes->post('/auth/login','AuthController::index');
$routes->get('/auth/logout','AuthController::logout');
$routes->get('/auth/is_logged_in','AuthController::is_login');

