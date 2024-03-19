@extends('layouts.master')

@section('title', 'Ver Permisos')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="card-title">Listado Permisos
                    @can('permissions.create')
                        <a href="{{ route('admin.permissions.create') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Permiso</a>
                    @endcan
                </h4>
                <p class="card-title">Permisos Registrados</p>
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
                            <th>Nombre de Permiso</th>
                            <th>Guard</th>
                            <th>Fecha Creacion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($permissions as $permission)
                            <tr>
                                <td>{{ $permission->id }}</td>
                                <td>{{ $permission->name }}</td>
                                <td>{{ $permission->guard_name }}</td>
                                <td class="text-primary">{{ $permission->created_at->toFormattedDateString() }}</td>
                                <td>
                                    @can('permissions.show')
                                        <a href="{{ route('admin.permissions.show', $permission->id) }}"
                                            class="btn btn-sm btn-primary"><i class="fas fa-eye"></i> Ver</a>
                                    @endcan
                                    @can('permissions.edit')
                                        <a href="{{ route('admin.permissions.edit', $permission->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('permissions.destroy')
                                        <a href="{{ route('admin.permissions.destroy', $permission->id) }}"
                                            class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminarlo?')"><i
                                                class="fas fa-trash-can"></i> Eliminar</a>
                                    @endcan
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

            </div>
        </div>

    </div>

@endsection
