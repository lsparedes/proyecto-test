@extends('layouts.master')

@section('title', 'Listado CriterioEvaluacionTest')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado de Criterio Evaluación Test
                    @can('add-criterio_evaluacion_test')
                        <a href="{{ url('admin/add-criterio_evaluacion_test') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Relación</a>
                    @endcan
                </h4>
                <p class="card-title">Seleccionar criterio de evaluación y asociarlo a un test.</p>
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
                            <th>Criterio de Evaluación</th>
                            <th>Test Asociado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($criterioEvaluacionTests as $criterioEvaluacionTest)
                            <tr>
                                <td>{{ $criterioEvaluacionTest->id }}</td>
                                <td>{{ $criterioEvaluacionTest->criterioEvaluacion->Nombre_Criterio }}</td>
                                <td>{{ $criterioEvaluacionTest->test->name_test }}</td>
                                <td>
                                    @can('edit-criterio_evaluacion_test')
                                        <a href="{{ url('admin/edit-criterio_evaluacion_test/' . $criterioEvaluacionTest->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i></a>
                                    @endcan
                                    @can('criterio_evaluacion_test.destroy')
                                        <a href="{{ url('admin/delete-criterio_evaluacion_test/' . $criterioEvaluacionTest->id) }}"
                                            class="btn btn-sm btn-danger"
                                            onclick="return confirm('¿Seguro que deseas eliminarlo?')"><i
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
