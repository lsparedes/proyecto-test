@extends('layouts.master')

@section('title', 'TipoTest')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4>Listado Tipo Test
                    @can('add-tipotest')
                        <a href="{{ url('admin/add-tipotest') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir
                            Tipo Test</a>
                    @endcan
                </h4>
                <p class="card-title">Agregar tests e información al respecto de los mismos.</p>
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
                            <th>N° test</th>
                            <th>Tipo Test</th>
                            <th>Tipo Test (esp)</th>
                            <th>Descripcion</th>
                            <th>Instrucciones</th>
                            <!-- <th>Instrucciones de descarga</th> -->
                            <th>Audio Instrucciones</th>
                            <th>Fuente</th>
                            <!-- <th>Icono</th> -->
                            <th>Implementación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($tipo_test as $item)
                            <tr>
                                <td>{{ $item->num_test }}</td>
                                <td>{{ $item->descripcion }}</td>
                                <td>{{ $item->nombre_esp }}</td>
                                <td>{{ $item->descripcion_test }}</td>
                                <td>{{ $item->instruccion_test }}</td>
                                <!-- <td>{{ $item->instrucciones_adicionales }}</td> -->
                                <td>
                                    <audio controls>
                                        <source src="{{ asset('uploads/' . $item->audio_instruccion) }}" type="audio/mpeg">
                                    </audio>
                                </td>
                                <td>{{ $item->fuente }}</td>
                                <!-- <td>{{ $item->icono }}</td> -->
                                <td>{{ $item->implementacion }}</td>

                                <td>
                                    <div class="btn-group" style="margin-right: 5px;">
                                        @can('edit-tipotest')
                                            <a href="{{ url('admin/edit-tipotest/' . $item->id) }}"
                                                class="btn btn-sm btn-success"><i class="fas fa-pen"></i></a>
                                        @endcan
                                    </div>
                                    <div class="btn-group">
                                        @can('delete-tipotest')
                                            <a href="{{ url('admin/delete-tipotest/' . $item->id) }}"
                                                class="btn btn-sm btn-danger"
                                                onclick="return confirm('¿Seguro que deseas eliminarlo?')"><i
                                                    class="fas fa-trash-can"></i></a>
                                        @endcan
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

            </div>

        </div>

    </div>

@endsection
