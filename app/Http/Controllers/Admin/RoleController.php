<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_if(Gate::denies('roles'), 403);
        $roles = Role::all();

        return view('admin.roles.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies('roles.create'), 403);
        $permissions = Permission::all()->pluck('name', 'id');
        //dd($permissions);
        return view('admin.roles.create', compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|unique:roles,name'
        ]);

        // Verificar si ya existe un permiso con el mismo nombre
        $existingRole = Role::where('name', $request->name)->first();

        if ($existingRole) {
            // Redirigir de nuevo al formulario de creación con un mensaje de error
            return redirect()->route('admin.roles.create')->with('error', 'Ya existe un rol con el mismo nombre');
        }

        // Guardar el nuevo permiso
        $role = Role::create($request->only('name'));

        $role->syncPermissions($request->input('permissions', []));

        // Redirigir con un mensaje de éxito
        return redirect()->route('admin.roles')->with('message', 'Rol creado correctamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        abort_if(Gate::denies('roles.show'), 403);
        $role->load('permissions');
        return view('admin.roles.show', compact('role'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        abort_if(Gate::denies('roles.edit'), 403);
        $permissions = Permission::all()->pluck('name', 'id');
        $role->load('permissions');
        return view('admin.roles.edit', compact('role', 'permissions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->only('name'));
        $role->syncPermissions($request->input('permissions', []));
        return redirect()->route('admin.roles')->with('message', 'Rol actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        abort_if(Gate::denies('roles.destroy'), 403);
        $role->delete();
        return redirect()->route('admin.roles')->with('message', 'Rol eliminado exitosamente');
    }
}
