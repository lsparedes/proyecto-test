@extends('layouts.master')

@section('title', 'TipoTest')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="">Editar Tipo Test </h4>
            </div>
            <div class="card-body">


                <form action= "{{ url('admin/update-tipotest/' . $tipo_test->id) }}" method="POST" enctype="multipart/form-data"
                    novalidate>
                    @csrf

                    @method('PUT')

                    <div class="mb-3">
                        <label for="num_test">Número Test</label>
                        <input type="text" name="num_test" value="{{ $tipo_test->num_test }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Tipo Test</label>
                        <input type="text" name="descripcion" value="{{ $tipo_test->descripcion }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion_test">Descripción Test</label>
                        <input type="text" name="descripcion_test" value="{{ $tipo_test->descripcion_test }}"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="instruccion_test">Instrucciones</label>
                        <input type="text" name="instruccion_test" value="{{ $tipo_test->instruccion_test }}"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="audio_instruccion">Audio Instrucciones</label>
                        <input type="file" name="audio_instruccion" accept="mp3" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="fuente">Fuente</label>
                        <input type="text" class="form-control" id="fuente" name="fuente" value="{{ old('fuente', $tipo_test->fuente ?? '') }}">
                    </div>

                    <div class="mb-3">
                        <label for="icono">Icono</label>
                        <select class="form-control" id="icono" name="icono">
                            <option value="">Seleccione un Icono</option>
                            <option value="fa-solid fa-download" {{ old('icono', $tipo_test->icono ?? '') == 'fa-solid fa-download' ? 'selected' : '' }}>Descarga</option>
                            <option value="fa-solid fa-code" {{ old('icono', $tipo_test->icono ?? '') == 'fa-solid fa-code' ? 'selected' : '' }}>Web</option>
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
