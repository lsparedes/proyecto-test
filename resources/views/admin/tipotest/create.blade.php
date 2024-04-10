@extends('layouts.master')

@section('title', 'Tipo Test')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="">Añadir Tipo Test </h4>
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
                        <label for="">Tipo Test</label>
                        <input type="text" name="descripcion" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Descripcion Test</label>
                        <input type="text" name="descripcion_test" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Instrucciones</label>
                        <input type="text" name="instruccion_test" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Audio Instrucciones (MP3)</label>
                        <input type="file" name="audio_instruccion" accept="mp3" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="fuente">Fuente</label>
                        <input type="text" class="form-control" id="fuente" name="fuente">
                    </div>
                    <div class="mb-3">
                        <label for="icono">Icono</label>
                        <select class="form-control" id="icono" name="icono">
                            <option value="">Seleccione un Icono</option>
                            <option value="fa-solid fa-download">Descarga</option>
                            <option value="fa-solid fa-code">Web</option>
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
