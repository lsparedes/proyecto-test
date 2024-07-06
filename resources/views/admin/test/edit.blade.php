@extends('layouts.master')

@section('title', 'Test')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.tests') }}" class="btn btn-m  mr-3"><i class="fas fa-arrow-left-long"></i></a>Editar Test </h4>
            </div>
            <div class="card-body">

                <form action="{{ url('admin/update-tests/' . $test->id) }}" method="POST" enctype="multipart/form-data" novalidate>
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label for="name_test">Nombre Test</label>
                        <input type="text" name="name_test" value="{{ old('name_test', $test->name_test) }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="nombre_espa">Nombre Test (español)</label>
                        <input type="text" name="nombre_espa" value="{{ old('nombre_espa', $test->nombre_espa) }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="points">Puntaje Maximo</label>
                        <input type="text" name="points" value="{{ old('points', $test->points) }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="duracion_minutos">Duracion Minutos</label>
                        <input type="text" name="duracion_minutos" value="{{ old('duracion_minutos', $test->duracion_minutos) }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="tipotest_id">Tipo de Test</label>
                        <select name="tipotest_id" id="tipotest_id" class="form-control">
                            @foreach ($tiposTest as $tipoTest)
                                <option value="{{ $tipoTest->id }}" {{ $test->tipotest_id == $tipoTest->id ? 'selected' : '' }}>
                                    {{ $tipoTest->descripcion }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Nuevo campo para el nombre de la URL -->
                    <div class="mb-3">
                        <label for="nombre_url">Nombre de la URL</label>
                        <input type="text" name="nombre_url" value="{{ old('nombre_url', $test->nombre_url) }}" class="form-control">
                    </div>

                    <!-- Campo existente para la URL del Test -->
                    <div class="mb-3">
                        <label for="url_test">URL del Test</label>
                        <input type="text" name="url_test" value="{{ old('url_test', $test->url_test) }}" class="form-control">
                    </div>

                    <!-- Nuevo campo para el nombre de la URL adicional -->
                    <div class="mb-3">
                        <label for="nombre_url_opcional">Nombre de la URL opcional</label>
                        <input type="text" name="nombre_url_opcional" value="{{ old('nombre_url_opcional', $test->nombre_url_opcional) }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="url_adicional">URL adicional del Test (opcional)</label>
                        <input type="text" name="url_adicional" value="{{ old('url_adicional', $test->url_adicional) }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="link_millisecond">URL del test (opcional)</label>
                        <input type="text" name="link_millisecond" value="{{ old('link_millisecond', $test->link_millisecond) }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="link_millisecond2">Link Millisecond (opcional)</label>
                        <input type="text" name="link_millisecond2" value="{{ old('link_millisecond2', $test->link_millisecond2) }}" class="form-control">
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
