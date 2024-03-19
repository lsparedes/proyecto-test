<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AdministradorController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('administrador'), 403);
        return view('admin.administrador');
    }
}
