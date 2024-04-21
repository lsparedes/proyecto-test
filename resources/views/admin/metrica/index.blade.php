@extends('layouts.master')

@section('title', 'Listado de Métricas')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado de Métricas
                    @can('add-metrica')
                        <a href="{{ url('admin/add-metrica') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Métrica</a>
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
                            <th>Nombre de la Métrica</th>
                            <th>Peso de la Métrica</th>
                            <th>Descripción de la Métrica</th>
                            <th>Criterio de Evaluación Asociado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($metricas as $metrica)
                            <tr>
                                <td>{{ $metrica->id }}</td>
                                <td>{{ $metrica->nombre_metrica }}</td>
                                <td>{{ $metrica->peso_metrica }}</td>
                                <td>{{ $metrica->descripcion_metrica }}</td>
                                <td>{{ $metrica->criterioEvaluacion->Nombre_Criterio }}</td>
                                <td>
                                    @can('edit-metrica')
                                        <a href="{{ url('admin/edit-metrica/' . $metrica->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-metrica')
                                        <a href="{{ url('admin/delete-metrica/' . $metrica->id) }}"
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
