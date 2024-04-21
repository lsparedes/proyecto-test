@extends('layouts.master')

@section('title', 'Editar Examinador Persona Test')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4 class="">Editar Examinador Persona Test </h4>
        </div>
        <div class="card-body">

            <form action="{{ url('admin/update-examinador-persona-test', $examinadorPersonaTest->id) }}" method="POST" enctype="multipart/form-data" novalidate>
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="users_id">Examinador</label>
                    <select name="users_id" id="users_id" class="form-control">
                        @foreach ($users as $user)
                            <option value="{{ $user->id }}">{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="persons_id">Persona</label>
                    <select name="persons_id" id="persons_id" class="form-control">
                        @foreach ($persons as $person)
                            <option value="{{ $person->id }}">{{ $person->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="test_id">Test</label>
                    <select name="test_id" id="test_id" class="form-control">
                        @foreach ($tests as $singleTest)
                            <option value="{{ $singleTest->id }}">{{ $singleTest->name_test }}</option>
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
