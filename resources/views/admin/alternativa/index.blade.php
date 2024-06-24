@extends('layouts.master')

@section('title', 'Listado de Alternativas')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado de Alternativas

                    @can('add-alternativa')
                        <a href="{{ url('admin/add-alternativa') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir Alternativa</a>
                    @endcan
                </h4>
                <p class="card-title">Agregar alternativas relevantes y vincularlas a una pregunta.</p>
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
                            <th>Texto de la Alternativa</th>
                            <th>¿Es Correcta?</th>
                            <th>Pregunta Asociada</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($alternativas as $alternativa)
                            <tr>
                                <td>{{ $alternativa->id }}</td>
                                <td>{{ $alternativa->texto_alternativa }}</td>
                                <td>{{ $alternativa->es_correcta ? 'Sí' : 'No' }}</td>
                                <td>{{ $alternativa->pregunta->texto_pregunta }}</td> {{-- Acceder al texto de la pregunta --}}
                                <td>
                                    @can('edit-alternativa')
                                        <a href="{{ url('admin/edit-alternativa/' . $alternativa->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i></a>
                                    @endcan
                                    @can('delete-alternativa')
                                        <a href="{{ url('admin/delete-alternativa/' . $alternativa->id) }}"
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
