@extends('layouts.master')

@section('title', 'TipoTest')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.tipotest') }}" class="btn btn-m  mr-3"><i
                            class="fas fa-arrow-left-long"></i></a>Editar Tipo Test </h4>
            </div>
            <div class="card-body">


                <form action= "{{ url('admin/update-tipotest/' . $tipo_test->id) }}" method="POST"
                    enctype="multipart/form-data" novalidate>
                    @csrf

                    @method('PUT')

                    <div class="mb-3">
                        <label for="num_test">Número Test</label>
                        <input type="text" id="num_test" name="num_test" value="{{ $tipo_test->num_test }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion">Tipo Test</label>
                        <input type="text" id="descripcion" name="descripcion" value="{{ $tipo_test->descripcion }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion_test">Descripción Test</label>
                        <input type="text" id="descripcion_test" name="descripcion_test" value="{{ $tipo_test->descripcion_test }}"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="instruccion_test">Instrucciones</label>
                        <input type="text" id="instruccion_test" name="instruccion_test" value="{{ $tipo_test->instruccion_test }}"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="instrucciones_adicionales">Instrucciones de descarga (test millisecond)</label>
                        <input type="text" id="instrucciones_adicionales" name="instrucciones_adicionales"
                            value="{{ $tipo_test->instrucciones_adicionales }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="enlace_descarga">Enlace de descarga (inquisit 6)</label>
                        <input type="text" id="enlace_descarga" name="enlace_descarga" value="{{ $tipo_test->enlace_descarga }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="audio_instruccion">Audio Instrucciones</label>
                        <input type="file" id="audio_instruccion" name="audio_instruccion" accept="mp3" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="fuente">Fuente</label>
                        <input type="text" class="form-control" id="fuente" name="fuente"
                            value="{{ old('fuente', $tipo_test->fuente ?? '') }}">
                    </div>

                    <div class="mb-3">
                        <label for="link_fuente">Link Fuente</label>
                        <input type="text" class="form-control" id="link_fuente" name="link_fuente"
                            value="{{ old('link_fuente', $tipo_test->link_fuente ?? '') }}">
                    </div>

                    <div class="mb-3">
                        <label for="icono">Icono</label>
                        <select class="form-control" id="icono" name="icono">
                            <option value="">Seleccione un Icono</option>
                            <option value="fa-solid fa-download"
                                {{ old('icono', $tipo_test->icono ?? '') == 'fa-solid fa-download' ? 'selected' : '' }}>
                                Descarga</option>
                            <option value="fa-solid fa-code"
                                {{ old('icono', $tipo_test->icono ?? '') == 'fa-solid fa-code' ? 'selected' : '' }}>Web
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="nombre_esp">Nombre español</label>
                        <input type="text" id="nombre_esp" name="nombre_esp" value="{{ $tipo_test->nombre_esp }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="implementacion">Implementación</label>
                        <select class="form-control" id="implementacion" name="implementacion">
                            <option value="">Seleccione metodo ejecucion</option>
                            <option value="Ejecucion local"
                                {{ old('implementacion', $tipo_test->implementacion ?? '') == 'Ejecucion local' ? 'selected' : '' }}>
                                Ejecucion local</option>
                            <option value="Ejecucion externa"
                                {{ old('implementacion', $tipo_test->implementacion ?? '') == 'Ejecucion externa' ? 'selected' : '' }}>
                                Ejecucion externa
                            </option>
                            <option value="Necesita descarga"
                                {{ old('implementacion', $tipo_test->implementacion ?? '') == 'Necesita descarga' ? 'selected' : '' }}>
                                Necesita descarga
                            </option>
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
