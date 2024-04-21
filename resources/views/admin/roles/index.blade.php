@extends('layouts.master')

@section('title', 'Ver Roles')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class="card-title">Listado Roles
                    @can('roles.create')
                        <a href="{{ route('admin.roles.create') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Rol</a>
                    @endcan
                </h4>
                <p class="card-title">Roles Registrados</p>
            </div>
            <div class="card-body">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif

                @if (session('error'))
                    <div class="alert alert-danger">
                        {{ session('error') }}
                    </div>
                @endif

                <table id="myDataTable" class="table table-bordered table cell-border">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de Rol</th>
                            <th>Guard</th>
                            <th>Fecha Creacion</th>
                            <th>Permisos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($roles as $role)
                            <tr>
                                <td>{{ $role->id }}</td>
                                <td>{{ $role->name }}</td>
                                <td>{{ $role->guard_name }}</td>
                                <td class="text-primary">{{ $role->created_at->toFormattedDateString() }}</td>
                                <td>
                                    @forelse ($role->permissions as $permission)
                                        <span class="badge rounded-pill badge-info">{{ $permission->name }}</span>
                                    @empty
                                        <span class="badge rounded-pill badge-danger">No tiene permisos</span>
                                    @endforelse
                                </td>
                                <td>
                                    @can('roles.show')
                                        <a href="{{ route('admin.roles.show', $role->id) }}" class="btn btn-sm btn-primary"><i
                                                class="fas fa-eye"></i> Ver</a>
                                    @endcan
                                    @can('roles.edit')
                                        <a href="{{ route('admin.roles.edit', $role->id) }}" class="btn btn-sm btn-success"><i
                                                class="fas fa-pen"></i> Editar </a>
                                    @endcan
                                    @can('roles.destroy')
                                        <a href="{{ route('admin.roles.destroy', $role->id) }}" class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminar este rol?')"><i
                                                class="fas fa-trash-can"></i> Eliminar</a>
                                    @endcan
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2">Sin registros.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>

            </div>
        </div>

    </div>

@endsection
