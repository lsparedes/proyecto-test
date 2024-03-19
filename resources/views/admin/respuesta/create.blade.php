@extends('layouts.master')

@section('title', 'Agregar Respuesta')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#e1ecec">
            <h4 class="">Agregar Respuesta</h4>
        </div>
        <div class="card-body">

            <form action="{{ route('admin.add-respuesta') }}" method="POST">
                @csrf

                <!-- Campos para agregar la respuesta -->
                <div class="mb-3">
                    <label for="texto_respuesta">Texto de la Respuesta</label>
                    <input type="text" name="texto_respuesta" id="texto_respuesta" class="form-control"
                        value="{{ old('texto_respuesta') }}">
                </div>

                <!-- Campo para seleccionar la pregunta asociada -->
                <div class="mb-3">
                    <label for="id_pregunta">Pregunta Asociada</label>
                    <select name="id_pregunta" id="id_pregunta" class="form-control">
                        @foreach ($preguntas as $pregunta)
                            <option value="{{ $pregunta->id }}" {{ old('id_pregunta') == $pregunta->id ? 'selected' : '' }}>
                                {{ $pregunta->texto_pregunta }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Campo para seleccionar el test asociado -->
                <div class="mb-3">
                    <label for="id_test">Test Asociado</label>
                    <select name="id_test" id="id_test" class="form-control">
                        @foreach ($tests as $test)
                            <option value="{{ $test->id }}" {{ old('id_test') == $test->id ? 'selected' : '' }}>
                                {{ $test->name_test }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <a href="{{ route('admin.respuesta') }}" class="btn btn-sm btn-secondary">Cancelar</a>
                    </div>
                </div>

            </form>

        </div>
    </div>

</div>

@endsection
