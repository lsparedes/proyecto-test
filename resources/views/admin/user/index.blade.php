@extends('layouts.master')

@section('title', 'Ver Usuarios')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4>Listado Usuarios
                    @can('add-user')
                        <a href="{{ url('admin/add-user') }}" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus"></i>
                            Añadir Usuarios</a>
                    @endcan
                </h4>
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

                <table id="myDataTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($users as $user)
                            <tr>
                                <td>{{ $user->id }}</td>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->email }}</td>
                                <td>
                                    @forelse ($user->roles as $role)
                                        <span class="badge badge-info">{{ $role->name }}</span>
                                    @empty
                                        <span class="badge badge-danger">No roles</span>
                                    @endforelse
                                </td>
                                <td>
                                    @can('show-user')
                                        <a href="{{ route('admin.show-user', $user->id) }}" class="btn btn-sm btn-primary"><i
                                                class="fas fa-eye"></i> Ver</a>
                                    @endcan
                                    @can('edit-user')
                                        <a href="{{ url('admin/edit-user/' . $user->id) }}" class="btn btn-sm btn-success"><i
                                                class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-user')
                                        <a href="{{ url('admin/delete-user/' . $user->id) }}" class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminar este usuario?')"><i
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
