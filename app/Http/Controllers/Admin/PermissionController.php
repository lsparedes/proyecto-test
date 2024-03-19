<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Illuminate\Validation\Rule;


class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_if(Gate::denies('permissions'), 403);
        $permissions = Permission::all();
        return view('admin.permissions.index', compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies('permissions.create'), 403);
        return view('admin.permissions.create');
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
            'name' => 'required|unique:permissions,name'
        ]);

        // Verificar si ya existe un permiso con el mismo nombre
        $existingPermission = Permission::where('name', $request->name)->first();

        if ($existingPermission) {
            // Redirigir de nuevo al formulario de creación con un mensaje de error
            return redirect()->route('admin.permissions.create')->with('error', 'Ya existe un permiso con el mismo nombre');
        }

        // Guardar el nuevo permiso
        Permission::create([
            'name' => $request->name
        ]);

        // Redirigir con un mensaje de éxito
        return redirect()->route('admin.permissions')->with('message', 'Permiso creado correctamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        abort_if(Gate::denies('permissions.show'), 403);
        return view('admin.permissions.show', compact('permission'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Permission $permission)
    {
        abort_if(Gate::denies('permissions.edit'), 403);
        return view('admin.permissions.edit', compact('permission'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->only('name'));
        return redirect()->route('admin.permissions')->with('message', 'Permiso actualizado exitosamente');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        abort_if(Gate::denies('permissions.destroy'), 403);
        $permission->delete();
        return redirect()->route('admin.permissions')->with('message', 'Permiso eliminado exitosamente');
    }
}
