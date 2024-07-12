<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
class UserController extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    use ResponseTrait;

    // public function __construct()
    // {
    //     header('Access-Control-Allow-Origin: *');
    //     header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    //     header('Access-Control-Allow-Headers: Content-Type, Authorization');
    // }
    public function index()
    {
        $model = new UserModel();
        $data = $model->findAll();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function show($id = null)
    {
        $model = new UserModel();
        $data = $model->find([ 'id' => $id]);
        if(!$data) return $this->failNotFound('no data found');
        return $this->respond($data[0]);
    }

    /**
     * Return a new resource object, with default properties.
     *
     * @return ResponseInterface
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters.
     *
     * @return ResponseInterface
     */
    public function create()
    {
        helper(['form']);
        $rules=[
            'username' => 'required',
            'password' => 'required',
        ];
        $data=[
            'username' => $this->request->getVar('username'),
            'password' => $this->request->getVar('password'),
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $model = new UserModel();
        $model->save($data);
        $response = [
            'status' => 201,
            'error' => null,
            'message' => [
                'success' => 'Data Inserted'
            ]
        ];

        return $this->respondCreated($response);
    }

    /**
     * Return the editable properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function update($id = null)
    {
        helper(['form']);
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];

        $data = [
            'username' => $this->request->getVar('username'),
            'password' => $this->request->getVar('password')
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getError());
        $model = new UserModel();

        $findById = $model->find(['id' => $id]);

        if(! $findById) return $this->failNotFound('no data found');

        $model->update($id, $data);
        $response = [
            'status' => 200,
            'error'  => null,
            'message' => [
                'success' => 'Data Updated'
            ]
        ];

        return $this->respond($response);
    }

    /**
     * Delete the designated resource object from the model.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function delete($id = null)
    {
        $model = new UserModel();
        $findById = $model->find(['id' => $id]);
        if(!$findById) return $this->failNotFound('no data found');
        $model->delete($id);
        $response = [
            'status' => 200,
            'error'  => null,
            'message' => [
                'success' => 'Data Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
