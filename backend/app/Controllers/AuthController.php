<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class AuthController extends BaseController
{
    public function index()
    {
        helper(['form']);
        $rules = [
            'username' => [
                'rules' => 'required|alpha_numeric|min_length[5]|max_length[20]',
                'errors' => [
                    'required' => 'The username is required.',
                    'alpha_numeric' => 'The username can only contain alphanumeric characters.',
                    'min_length' => 'The username must be at least 5 characters long.',
                    'max_length' => 'The username cannot be more than 20 characters long.'
                ]
            ],
            'password' => [
                'rules' => 'required|min_length[8]|max_length[255]',
                'errors' => [
                    'required' => 'The password is required.',
                    'min_length' => 'The password must be at least 8 characters long.',
                    'max_length' => 'The password cannot be more than 255 characters long.'
                ]
            ]
        ];

        if (!$this->validate($rules)) {
            $errors = $this->validator->getErrors();
            return $this->response->setJSON([
                'status' => 'Error',
                'errors' => $errors,
            ]);
        }

        $usermodel = new UserModel();
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');

        $user = $usermodel->where('username', $username)->first();

        if ($user && $password === $user['password']) { 
        // if ($user && password_verify($password, $user['password'])) {
            $response = [
                'status' => 'success',
                'message' => 'Login successful',
                'redirect'=> '/'
            ];
            session()->set(['username' => $username]);
            
            return $this->response->setJSON($response);
        }
        $response = [
            'status' => 'Error',
            'message' => 'Invalid username or password',
        ];

        return $this->response->setJSON($response);
    }

    public function logout()
    {
        session()->destroy();
        return $this->response->setJSON(['status'=>'success','redirect'=>'/login']);
    }

    public function is_login()
    {
        if(session()->has('username')){
            return $this->response->setJSON(['logged_in'=> true, 'redirect'=>'/']);
            // return redirect()->to(base_url(''));
        }
        return $this->response->setJSON(['logged_in'=> false]);
    }
}
