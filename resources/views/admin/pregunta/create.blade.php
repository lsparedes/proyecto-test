@extends('layouts.master')

@section('title', 'Crear Pregunta')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4 class=""><a href="{{ route('admin.pregunta') }}" class="btn btn-m  mr-3"><i
                class="fas fa-arrow-left-long"></i></a>Crear Pregunta</h4>
        </div>
        <div class="card-body">

            <form action="{{ url('admin/add-pregunta') }}" method="POST" enctype="multipart/form-data" novalidate>
                @csrf

                <div class="mb-3">
                    <label for="texto_pregunta">Texto de la Pregunta</label>
                    <input type="text" name="texto_pregunta" id="texto_pregunta" class="form-control @error('texto_pregunta') is-invalid @enderror" value="{{ old('texto_pregunta') }}">
                    @error('texto_pregunta')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="tipo_respuesta">Tipo de Respuesta</label>
                    <input type="text" name="tipo_respuesta" id="tipo_respuesta" class="form-control @error('tipo_respuesta') is-invalid @enderror" value="{{ old('tipo_respuesta') }}">
                    @error('tipo_respuesta')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="respuesta_correcta">Respuesta Correcta</label>
                    <input type="text" name="respuesta_correcta" id="respuesta_correcta" class="form-control @error('respuesta_correcta') is-invalid @enderror" value="{{ old('respuesta_correcta') }}">
                    @error('respuesta_correcta')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="id_test">Nombre del Test</label>
                    <select name="id_test" id="id_test" class="form-control @error('id_test') is-invalid @enderror">
                        @foreach ($tests as $test)
                            <option value="{{ $test->id }}" {{ old('id_test') == $test->id ? 'selected' : '' }}>
                                {{ $test->name_test }} {{-- Cambiado a name_test --}}
                            </option>
                        @endforeach
                    </select>
                    @error('id_test')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                        <button type="reset" class="btn btn-sm btn-secondary">Limpiar</button>
                    </div>
                </div>
            </form>

        </div>
    </div>

</div>

@endsection
