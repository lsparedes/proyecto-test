@extends('layouts.master')

@section('title', 'Test')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="">Añadir Test </h4>
            </div>
            <div class="card-body">

                <form action="{{ url('admin/add-tests') }}" method="POST" enctype="multipart/form-data" novalidate>
                    @csrf

                    <div class="mb-3">
                        <label for="name_test">Nombre Test</label>
                        <input type="text" name="name_test" class="form-control">
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

                    <!-- Nuevo campo para la URL -->
                    <div class="mb-3">
                        <label for="url_test">URL del Test</label>
                        <input type="text" name="url_test" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="url_adicional">URL adicional del Test (opcional)</label>
                        <input type="text" name="url_adicional" class="form-control">
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <button type="submit" class="btn btn-sm btn-primary">Guardar Test</button>
                        </div>
                    </div>

                </form>

            </div>

        </div>
    </div>

@endsection
