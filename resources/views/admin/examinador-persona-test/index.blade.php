@extends('layouts.master')

@section('title', 'Examinador Persona Tests')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="">Lista de Examinador Persona Tests
                    @can('add-examinador-persona-test')
                        <a href="{{ url('admin/add-examinador-persona-test') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir</a>
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
                            <th>Examinador</th>
                            <th>Persona</th>
                            <th>Test</th>
                            <th>Observación</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Termino</th>
                            <th>Puntuacion obtenida</th>
                            <th>Duracion (minutos)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($examinadorPersonaTests as $examinadorPersonaTest)
                            <tr>
                                <td>{{ $examinadorPersonaTest->user->name }}</td>
                                <td>{{ $examinadorPersonaTest->person->name }}</td>
                                <td>{{ $examinadorPersonaTest->test->name_test }}</td>
                                <td>{{ $examinadorPersonaTest->observacion }}</td>
                                <td>{{ $examinadorPersonaTest->fecha_observacion->format('d/m/Y H:i') }}</td>
                                <td>{{ $examinadorPersonaTest->fecha_termino ? $examinadorPersonaTest->fecha_termino->format('d/m/Y H:i') : '-' }}</td>
                                <td>{{ $examinadorPersonaTest->puntuacion }}</td>
                                <td>{{ $examinadorPersonaTest->duracion }}</td>
                                <td>
                                    @can('edit-examinador-persona-test')
                                        <a href="{{ url('admin/edit-examinador-persona-test/' . $examinadorPersonaTest->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-examinador-persona-test')
                                        <a href="{{ url('admin/delete-examinador-persona-test/' . $examinadorPersonaTest->id) }}"
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
