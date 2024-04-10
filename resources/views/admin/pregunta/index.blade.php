@extends('layouts.master')

@section('title', 'Listado preguntas')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4>Listado de Preguntas
                    @can('add-pregunta')
                        <a href="{{ url('admin/add-pregunta') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Pregunta</a>
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
                            <th>Texto de la Pregunta</th>
                            <th>Tipo de Respuesta</th>
                            <th>Respuesta Correcta</th>
                            <th>Test Asociado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($preguntas as $pregunta)
                            <tr>
                                <td>{{ $pregunta->id }}</td>
                                <td>{{ $pregunta->texto_pregunta }}</td>
                                <td>{{ $pregunta->tipo_respuesta }}</td>
                                <td>{{ $pregunta->respuesta_correcta }}</td>
                                <td>{{ $pregunta->test->name_test }}</td> {{-- Acceder al nombre del test --}}
                                <td>
                                    @can('edit-pregunta')
                                        <a href="{{ url('admin/edit-pregunta/' . $pregunta->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-pregunta')
                                        <a href="{{ url('admin/delete-pregunta/' . $pregunta->id) }}"
                                            class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminarla?')"><i
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
