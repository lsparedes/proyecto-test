@extends('layouts.master')

@section('title', 'Editar Respuesta')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4 class=""><a href="{{ route('admin.respuesta') }}" class="btn btn-m  mr-3"><i
                class="fas fa-arrow-left-long"></i></a>Editar Respuesta</h4>
        </div>
        <div class="card-body">

            <form action="{{ route('admin.update-respuesta', ['id' => $respuesta->id]) }}" method="POST">
                @csrf
                @method('PUT')

                <!-- Campos para editar la respuesta -->
                <div class="mb-3">
                    <label for="texto_respuesta">Texto de la Respuesta</label>
                    <input type="text" name="texto_respuesta" id="texto_respuesta" class="form-control"
                        value="{{ $respuesta->texto_respuesta }}">
                </div>

                <!-- Campo para seleccionar la pregunta asociada -->
                <div class="mb-3">
                    <label for="id_pregunta">Pregunta Asociada</label>
                    <select name="id_pregunta" id="id_pregunta" class="form-control">
                        @foreach ($preguntas as $pregunta)
                            <option value="{{ $pregunta->id }}" {{ $pregunta->id == $respuesta->id_pregunta ? 'selected' : '' }}>
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
                            <option value="{{ $test->id }}" {{ $test->id == $respuesta->id_test ? 'selected' : '' }}>
                                {{ $test->name_test }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px;">Guardar</button>
                    </div>
                </div>

            </form>

        </div>
    </div>

</div>

@endsection
