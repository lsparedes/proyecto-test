@extends('layouts.master')

@section('title', 'Listado de Fórmulas')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4>Listado de Fórmulas
                    @can('add-formula')
                        <a href="{{ route('admin.add-formula') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Fórmula</a>
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
                            <th>Nombre de la Fórmula</th>
                            <th>Expresión de la Fórmula</th>
                            <th>Peso de la Fórmula</th>
                            <th>Criterio de Evaluación Asociado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($formulas as $formula)
                            <tr>
                                <td>{{ $formula->id }}</td>
                                <td>{{ $formula->nombre_formula }}</td>
                                <td>{{ $formula->expresion_formula }}</td>
                                <td>{{ $formula->peso_formula }}</td>
                                <td>{{ $formula->criterioEvaluacion->Nombre_Criterio }}</td> {{-- Acceder al nombre del criterio --}}
                                <td>
                                    @can('edit-formula')
                                        <a href="{{ route('admin.edit-formula', $formula->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-formula')
                                        <a href="{{ route('admin.delete-formula', $formula->id) }}"
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
