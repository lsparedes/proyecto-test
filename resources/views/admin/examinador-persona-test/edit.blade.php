@extends('layouts.master')

@section('title', 'Editar Examinador Persona Test')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.examinador-persona-test') }}" class="btn btn-m mr-3"><i
                            class="fas fa-arrow-left-long"></i></a>Editar Examinador Persona Test</h4>
            </div>
            <div class="card-body">

                <form action="{{ url('admin/update-examinador-persona-test', $examinadorPersonaTest->id) }}" method="POST"
                    enctype="multipart/form-data" novalidate>
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label for="users_id">Examinador</label>
                        <select name="users_id" id="users_id" class="form-control" required>
                            @foreach ($users as $user)
                                <option value="{{ $user->id }}"
                                    {{ old('users_id', $examinadorPersonaTest->users_id) == $user->id ? 'selected' : '' }}>
                                    {{ $user->name }}</option>
                            @endforeach
                        </select>
                        @error('users_id')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="persons_id">Persona</label>
                        <select name="persons_id" id="persons_id" class="form-control" required>
                            @foreach ($persons as $person)
                                <option value="{{ $person->id }}"
                                    {{ old('persons_id', $examinadorPersonaTest->persons_id) == $person->id ? 'selected' : '' }}>
                                    {{ $person->name }} {{ $person->last_name }}</option>
                            @endforeach
                        </select>
                        @error('persons_id')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="test_id">Test</label>
                        <select name="test_id" id="test_id" class="form-control" required>
                            @foreach ($tests as $singleTest)
                                <option value="{{ $singleTest->id }}"
                                    {{ old('test_id', $examinadorPersonaTest->test_id) == $singleTest->id ? 'selected' : '' }}>
                                    {{ $singleTest->name_test }}</option>
                            @endforeach
                        </select>
                        @error('test_id')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="observacion">Observación</label>
                        <input type="text" name="observacion" class="form-control"
                            value="{{ old('observacion', $examinadorPersonaTest->observacion) }}" required>
                        @error('observacion')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="fecha_observacion">Fecha Inicio</label>
                        <input type="datetime-local" name="fecha_observacion" class="form-control"
                            value="{{ old('fecha_observacion', \Carbon\Carbon::parse($examinadorPersonaTest->fecha_observacion)->format('Y-m-d\TH:i:s')) }}"
                            required>
                        @error('fecha_observacion')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="fecha_termino">Fecha Término</label>
                        <input type="datetime-local" name="fecha_termino" class="form-control"
                            value="{{ old('fecha_termino', \Carbon\Carbon::parse($examinadorPersonaTest->fecha_termino)->format('Y-m-d\TH:i:s')) }}">
                        @error('fecha_termino')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="puntuacion">Puntuación Obtenida</label>
                        <input type="number" name="puntuacion" class="form-control"
                            value="{{ old('puntuacion', $examinadorPersonaTest->puntuacion) }}">
                        @error('puntuacion')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="duracion">Duración (minutos)</label>
                        <input type="number" name="duracion" class="form-control"
                            value="{{ old('duracion', $examinadorPersonaTest->duracion) }}">
                        @error('duracion')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="csv_path">Archivo CSV</label>
                        <input type="file" name="csv_path" class="form-control" accept=".csv">
                        @if ($examinadorPersonaTest->csv_path)
                            <p>Archivo actual: <a
                                    href="{{ asset('storage/' . $examinadorPersonaTest->csv_path) }}">Descargar CSV</a></p>
                        @endif
                        @error('csv_path')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="image_path">Imágenes</label>
                        <input type="file" name="image_path[]" class="form-control" accept="image/*" multiple>
                        @if ($examinadorPersonaTest->image_path)
                            <p>Imágenes actuales:</p>
                            <div class="d-flex flex-wrap">
                                @foreach (json_decode($examinadorPersonaTest->image_path) as $imagePath)
                                    <div class="m-2">
                                        <img src="{{ asset('storage/' . $imagePath) }}" alt="Imagen actual"
                                            style="max-width: 100px;">
                                    </div>
                                @endforeach
                            </div>
                        @endif
                        @error('image_path')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="audio_path">Audios</label>
                        <input type="file" name="audio_path[]" class="form-control" accept="audio/*" multiple>
                        @if ($examinadorPersonaTest->audio_path)
                            <p>Audios actuales:</p>
                            <ul>
                                @foreach (json_decode($examinadorPersonaTest->audio_path) as $audioPath)
                                    <li>
                                        <audio controls>
                                            <source src="{{ asset('storage/' . $audioPath) }}" type="audio/mpeg">
                                            Tu navegador no soporta el elemento de audio.
                                        </audio>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                        @error('audio_path')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
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
