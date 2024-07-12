<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class CsrftokenController extends BaseController
{
    public function index()
    {
        return $this->response->setJSON([
            'token' => csrf_hash(),
        ]);
    }
}
