@extends('layouts.master')

@section('title', 'Listado de Respuestas')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado de Respuestas
                    @can('add-respuesta')
                        <a href="{{ url('admin/add-respuesta') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Respuesta</a>
                    @endcan
                </h4>
                <p class="card-title">Agregar respuestas relevantes y asociarlas a su test.</p>
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
                            <th>Texto de la Respuesta</th>
                            <th>Pregunta Asociada</th>
                            <th>Test Asociado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($respuestas as $respuesta)
                            <tr>
                                <td>{{ $respuesta->id }}</td>
                                <td>{{ $respuesta->texto_respuesta }}</td>
                                <td>{{ $respuesta->pregunta->texto_pregunta }}</td> {{-- Acceder al texto de la pregunta --}}
                                <td>{{ $respuesta->test->name_test }}</td> {{-- Acceder al nombre del test --}}
                                <td>
                                    @can('edit-respuesta')
                                        <a href="{{ url('admin/edit-respuesta/' . $respuesta->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i></a>
                                    @endcan
                                    @can('delete-respuesta')
                                        <a href="{{ url('admin/delete-respuesta/' . $respuesta->id) }}"
                                            class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminarla?')"><i
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
