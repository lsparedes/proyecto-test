@extends('layouts.master')

@section('title', 'Agregar Criterio de Evaluación')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class="">Agregar Criterio de Evaluación</h4>
            </div>
            <div class="card-body">

                <form action="{{ route('admin.add-criterio-evaluacion') }}" method="POST">
                    @csrf

                    <!-- Campo para ingresar el nombre del criterio -->
                    <div class="mb-3">
                        <label for="Nombre_Criterio">Nombre del Criterio</label>
                        <input type="text" name="Nombre_Criterio" id="Nombre_Criterio" class="form-control"
                            value="{{ old('Nombre_Criterio') }}">
                    </div>

                    <!-- Campo para ingresar la descripción del criterio -->
                    <div class="mb-3">
                        <label for="Descripcion_Criterio">Descripción del Criterio</label>
                        <textarea name="Descripcion_Criterio" id="Descripcion_Criterio" class="form-control" rows="4">{{ old('Descripcion_Criterio') }}</textarea>
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
