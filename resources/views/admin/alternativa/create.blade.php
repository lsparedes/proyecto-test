@extends('layouts.master')

@section('title', 'Agregar Alternativa')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class="">Agregar Alternativa</h4>
            </div>
            <div class="card-body">

                <form action="{{ route('admin.add-alternativa') }}" method="POST">
                    @csrf

                    <!-- Campo para ingresar el texto de la alternativa -->
                    <div class="mb-3">
                        <label for="texto_alternativa">Texto de la Alternativa</label>
                        <input type="text" name="texto_alternativa" id="texto_alternativa" class="form-control"
                            value="{{ old('texto_alternativa') }}">
                    </div>

                    <!-- Campo para marcar si la alternativa es correcta -->
                    <div class="mb-3 form-check">
                        <input type="checkbox" name="es_correcta" id="es_correcta" class="form-check-input" {{ old('es_correcta') ? 'checked' : '' }} value="1">
                        <label for="es_correcta" class="form-check-label">Es Correcta</label>
                    </div>

                    <!-- Campo para seleccionar la pregunta asociada -->
                    <div class="mb-3">
                        <label for="id_pregunta">Pregunta Asociada</label>
                        <select name="id_pregunta" id="id_pregunta" class="form-control">
                            @foreach($preguntas as $pregunta)
                                <option value="{{ $pregunta->id }}" {{ old('id_pregunta') == $pregunta->id ? 'selected' : '' }}>
                                    {{ $pregunta->texto_pregunta }}
                                </option>
                            @endforeach
                        </select>
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
