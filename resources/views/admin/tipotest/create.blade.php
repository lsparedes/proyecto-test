@extends('layouts.master')

@section('title', 'Tipo Test')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.tipotest') }}" class="btn btn-m  mr-3"><i
                            class="fas fa-arrow-left-long"></i></a>Añadir Tipo Test </h4>
            </div>
            <div class="card-body">

                @if ($errors->any())
                    <div class="alert alert-danger">
                        @foreach ($errors->all() as $error)
                            <div>{{ $error }}</div>
                        @endforeach
                    </div>

                @endif


                <form action= "{{ url('/admin/add-tipotest') }}" method="POST" enctype="multipart/form-data" novalidate>
                    @csrf

                    <div class="mb-3">
                        <label for="">Numero Test</label>
                        <input type="text" name="num_test" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion">Tipo Test</label>
                        <input type="text" name="descripcion" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion_test">Descripcion Test</label>
                        <input type="text" name="descripcion_test" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="instruccion_test">Instrucciones</label>
                        <input type="text" name="instruccion_test" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="instrucciones_adicionales">Instrucciones de descarga (test millisecond)</label>
                        <input type="text" name="instrucciones_adicionales" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="enlace_descarga">Enlace de descarga (inquisit 6)</label>
                        <input type="text" name="enlace_descarga" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="audio_instruccion">Audio Instrucciones (MP3)</label>
                        <input type="file" name="audio_instruccion" accept="mp3" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="fuente">Fuente</label>
                        <input type="text" class="form-control" id="fuente" name="fuente">
                    </div>
                    <div class="mb-3">
                        <label for="link_fuente">Link Fuente</label>
                        <input type="text" class="form-control" id="link_fuente" name="link_fuente">
                    </div>
                    <div class="mb-3">
                        <label for="icono">Icono</label>
                        <select class="form-control" id="icono" name="icono">
                            <option value="">Seleccione un Icono</option>
                            <option value="fa-solid fa-download">Descarga</option>
                            <option value="fa-solid fa-code">Web</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="nombre_esp">Nombre español</label>
                        <input type="text" name="nombre_esp" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Implementación</label>
                        <select class="form-control" id="implementacion" name="implementacion">
                            <option value="">Seleccione metodo ejecucion</option>
                            <option value="Ejecucion local">Ejecucion local</option>
                            <option value="Ejecucion externa">Ejecucion externa</option>
                            <option value="Necesita descarga">Necesita descarga</option>
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
