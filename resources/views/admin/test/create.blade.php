@extends('layouts.master')

@section('title', 'Test')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.tests') }}" class="btn btn-m  mr-3"><i
                    class="fas fa-arrow-left-long"></i></a>Añadir Test </h4>
            </div>
            <div class="card-body">

                <form action="{{ url('admin/add-tests') }}" method="POST" enctype="multipart/form-data" novalidate>
                    @csrf

                    <div class="mb-3">
                        <label for="name_test">Nombre Test</label>
                        <input type="text" name="name_test" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="nombre_espa">Nombre Test (español)</label>
                        <input type="text" name="nombre_espa" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="points">Puntaje Maximo</label>
                        <input type="text" name="points" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="duracion_minutos">Duración (minutos)</label>
                        <input type="text" name="duracion_minutos" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="tipotest_id">Tipo de Test</label>
                        <select name="tipotest_id" id="tipotest_id" class="form-control">
                            @foreach ($tiposTest as $tipoTest)
                                <option value="{{ $tipoTest->id }}">{{ $tipoTest->descripcion }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="url_test">URL del Test</label>
                                <input type="text" name="url_test" class="form-control">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="nombre_url">Nombre de la URL</label>
                                <input type="text" name="nombre_url" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="url_adicional">URL adicional del Test (opcional)</label>
                                <input type="text" name="url_adicional" class="form-control">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="nombre_url_opcional">Nombre de la URL opcional</label>
                                <input type="text" name="nombre_url_opcional" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="link_millisecond">URL test (opcional)</label>
                        <input type="text" name="link_millisecond" class="form-control">
                    </div>


                    <div class="row">
                        <div class="col-md-6">
                            <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px">Guardar Test</button>
                        </div>
                    </div>

                </form>

            </div>

        </div>
    </div>

@endsection
