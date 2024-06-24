@extends('layouts.master')

@section('title', 'Examinador Persona Tests')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class="">Administración de resultados y examinadores
                    @can('add-examinador-persona-test')
                        <a href="{{ url('admin/add-examinador-persona-test') }}" class="btn btn-primary btn-sm float-end"><i
                                class="fas fa-plus"></i> Añadir</a>
                    @endcan
                </h4>
                <p class="card-title">Vínculo de examinadores con personas que realicen algún test para administrar sus resultados.</p>
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
                            <th>CSV</th>
                            <th>Imágenes</th>
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
                                    @if ($examinadorPersonaTest->csv_path)
                                        <a href="{{ route('download.csv', $examinadorPersonaTest->id) }}"><i class="fa-solid fa-file-csv fa-2xl"></i></a>
                                    @endif
                                </td>
                                <td>
                                    @if ($examinadorPersonaTest->image_path)
                                        @foreach (json_decode($examinadorPersonaTest->image_path) as $imagePath)
                                            <a href="{{ route('download.image', ['id' => $examinadorPersonaTest->id, 'image' => $imagePath]) }}" download="{{ basename($imagePath) }}">
                                                <i class="fa-regular fa-image fa-2xl"></i>
                                            </a>
                                        @endforeach
                                    @endif
                                </td>
                                <td>
                                    @can('edit-examinador-persona-test')
                                        <a href="{{ url('admin/edit-examinador-persona-test/' . $examinadorPersonaTest->id) }}"
                                            class="btn btn-sm btn-success"><i class="fas fa-pen"></i></a>
                                    @endcan
                                    @can('delete-examinador-persona-test')
                                        <a href="{{ url('admin/delete-examinador-persona-test/' . $examinadorPersonaTest->id) }}"
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
