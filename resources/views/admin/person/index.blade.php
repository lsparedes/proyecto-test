@extends('layouts.master')

@section('title', 'Persona')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado Personas
                    @can('add-persons')
                        <a href="{{ url('admin/add-persons') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir
                            Persona</a>
                    @endcan
                </h4>
                <p class="card-title">Agregar personas que realicen algún test, para luego registrar sus resultados.</p>
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
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Genero</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($person as $item)
                            <tr>
                                <td>{{ $item->id }}</td>
                                <td>{{ $item->name }}</td>
                                <td>{{ $item->last_name }}</td>
                                <td>{{ $item->age }}</td>
                                <td>{{ $item->genre }}</td>
                                <td>
                                    @can('edit-person')
                                        <a href="{{ url('admin/edit-person/' . $item->id) }}" class="btn btn-sm btn-success"><i
                                                class="fas fa-pen"></i></a>
                                    @endcan
                                    @can('delete-person')
                                        <a href="{{ url('admin/delete-person/' . $item->id) }}" class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminar esta persona?')"><i
                                                class="fas fa-trash-can"></i></a>
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
