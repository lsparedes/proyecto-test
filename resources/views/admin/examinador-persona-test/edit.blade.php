@extends('layouts.master')

@section('title', 'Editar Examinador Persona Test')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4 class=""><a href="{{ route('admin.examinador-persona-test') }}" class="btn btn-m  mr-3"><i
                class="fas fa-arrow-left-long"></i></a>Editar Examinador Persona Test </h4>
        </div>
        <div class="card-body">

            <form action="{{ url('admin/update-examinador-persona-test', $examinadorPersonaTest->id) }}" method="POST" enctype="multipart/form-data" novalidate>
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="users_id">Examinador</label>
                    <select name="users_id" id="users_id" class="form-control">
                        @foreach ($users as $user)
                            <option value="{{ $user->id }}" {{ $user->id == $examinadorPersonaTest->users_id ? 'selected' : '' }}>{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="persons_id">Persona</label>
                    <select name="persons_id" id="persons_id" class="form-control">
                        @foreach ($persons as $person)
                            <option value="{{ $person->id }}" {{ $person->id == $examinadorPersonaTest->persons_id ? 'selected' : '' }}>{{ $person->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="test_id">Test</label>
                    <select name="test_id" id="test_id" class="form-control">
                        @foreach ($tests as $singleTest)
                            <option value="{{ $singleTest->id }}" {{ $singleTest->id == $examinadorPersonaTest->test_id ? 'selected' : '' }}>{{ $singleTest->name_test }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="observacion">Observacion</label>
                    <input type="text" name="observacion" class="form-control" value="{{ $examinadorPersonaTest->observacion }}">
                </div>

                <div class="mb-3">
                    <label for="fecha_observacion">Fecha Inicio</label>
                    <input type="datetime-local" name="fecha_observacion" class="form-control" value="{{ \Carbon\Carbon::parse($examinadorPersonaTest->fecha_observacion)->format('Y-m-d\TH:i:s') }}">
                </div>

                <div class="mb-3">
                    <label for="fecha_termino">Fecha Termino</label>
                    <input type="datetime-local" name="fecha_termino" class="form-control" value="{{ \Carbon\Carbon::parse($examinadorPersonaTest->fecha_termino)->format('Y-m-d\TH:i:s') }}">
                </div>

                <div class="mb-3">
                    <label for="puntuacion">Puntuacion Obtenida</label>
                    <input type="text" name="puntuacion" class="form-control" value="{{ $examinadorPersonaTest->puntuacion }}">
                </div>

                <div class="mb-3">
                    <label for="duracion">Duracion (minutos)</label>
                    <input type="text" name="duracion" class="form-control" value="{{ $examinadorPersonaTest->duracion }}">
                </div>

                <div class="mb-3">
                    <label for="csv_path">Archivo CSV</label>
                    <input type="file" name="csv_path" class="form-control" accept=".csv">
                    @if ($examinadorPersonaTest->csv_path)
                        <p>Archivo actual: <a href="{{ asset('storage/' . $examinadorPersonaTest->csv_path) }}">Descargar CSV</a></p>
                    @endif
                </div>

                <div class="mb-3">
                    <label for="image_path">Imágenes</label>
                    <input type="file" name="image_path[]" class="form-control" accept="image/*" multiple>
                    @if ($examinadorPersonaTest->image_paths)
                        <p>Imágenes actuales:</p>
                        @foreach (json_decode($examinadorPersonaTest->image_path) as $imagePath)
                            <img src="{{ asset('storage/' . $imagePath) }}" alt="Imagen actual" style="max-width: 100px;">
                        @endforeach
                    @endif
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                    </div>
                </div>

            </form>

        </div>

    </div>
</div>

@endsection
