@extends('layouts.master')

@section('title', 'Test')

@section('content')

    <div class="container-fluid px-4">


        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado Test
                    @can('add-tests')
                        <a href="{{ url('admin/add-tests') }}" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus"></i>
                            Añadir
                            Test</a>
                    @endcan
                </h4>
            </div>
            <div class="card-body">
                @if (session('message'))
                    <div class="alert alert-success">{{ session('message') }}</div>
                @endif

                <table id="myDataTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre test</th>
                            <th>Tipo Test</th>
                            <th>Nombre test (español)</th>
                            <th>Puntaje maximo</th>
                            <th>Duracion (minutos)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($test as $item)
                            <tr>
                                <td>{{ $item->name_test }}</td>
                                <td>{{ $item->tipoTest->descripcion }}</td> 
                                <td>{{ $item->nombre_espa }}</td>
                                <td>{{ $item->points }}</td>
                                <td>{{ $item->duracion_minutos }}</td>
                                <td>
                                    @can('edit-tests')
                                        <a href="{{ url('admin/edit-tests/' . $item->id) }}" class="btn btn-sm btn-success"><i
                                                class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-tests')
                                        <a href="{{ url('admin/delete-tests/' . $item->id) }}" class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminar este test?')"><i
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
