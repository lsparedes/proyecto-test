@extends('layouts.master')

@section('title', 'Editar Pregunta')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.pregunta') }}" class="btn btn-m  mr-3"><i
                    class="fas fa-arrow-left-long"></i></a>Editar Pregunta</h4>
            </div>
            <div class="card-body">

                <form action="{{ route('admin.update-pregunta', ['id' => $pregunta->id]) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label for="texto_pregunta">Texto de la Pregunta</label>
                        <input type="text" name="texto_pregunta" id="texto_pregunta" class="form-control"
                            value="{{ $pregunta->texto_pregunta }}">
                    </div>

                    <!-- Campo para editar el tipo de respuesta -->
                    <div class="mb-3">
                        <label for="tipo_respuesta">Tipo de Respuesta</label>
                        <input type="text" name="tipo_respuesta" id="tipo_respuesta" class="form-control"
                            value="{{ $pregunta->tipo_respuesta }}">
                    </div>

                    <!-- Campo para editar la respuesta correcta -->
                    <div class="mb-3">
                        <label for="respuesta_correcta">Respuesta Correcta</label>
                        <input type="text" name="respuesta_correcta" id="respuesta_correcta" class="form-control"
                            value="{{ $pregunta->respuesta_correcta }}">
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
