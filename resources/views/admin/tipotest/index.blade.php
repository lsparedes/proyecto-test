@extends('layouts.master')

@section('title', 'TipoTest')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4>Listado Tipo Test
                    @can('add-tipotest')
                        <a href="{{ url('admin/add-tipotest') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir
                            Tipo Test</a>
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
                            <th>N° test</th>
                            <th>Tipo Test</th>
                            <th>Descripcion</th>
                            <th>Instrucciones</th>
                            <th>Audio Instrucciones</th>
                            <th>Fuente</th>
                            <th>Icono</th> 
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($tipo_test as $item)
                            <tr>
                                <td>{{ $item->num_test }}</td>
                                <td>{{ $item->descripcion }}</td>
                                <td>{{ $item->descripcion_test }}</td>
                                <td>{{ $item->instruccion_test }}</td>
                                <td>
                                    <audio controls>
                                        <source src="{{ asset('uploads/' . $item->audio_instruccion) }}" type="audio/mpeg">
                                    </audio>
                                </td>
                                <td>{{ $item->fuente }}</td> <!-- Mostrar fuente -->
                                <td><i class="{{ $item->icono }}"></i></td> <!-- Mostrar icono con clase dinámica -->

                                <td>
                                    @can('edit-tipotest')
                                        <a href="{{ url('admin/edit-tipotest/' . $item->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                    @endcan
                                    @can('delete-tipotest')
                                        <a href="{{ url('admin/delete-tipotest/' . $item->id) }}" class="btn btn-sm btn-danger"
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
