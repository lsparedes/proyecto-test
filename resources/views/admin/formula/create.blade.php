@extends('layouts.master')

@section('title', 'Agregar Fórmula')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#e1ecec">
            <h4 class="">Agregar Fórmula</h4>
        </div>
        <div class="card-body">

            <form action="{{ route('admin.add-formula') }}" method="POST">
                @csrf

                <!-- Campo para ingresar el nombre de la fórmula -->
                <div class="mb-3">
                    <label for="nombre_formula">Nombre de la Fórmula</label>
                    <input type="text" name="nombre_formula" id="nombre_formula" class="form-control" value="{{ old('nombre_formula') }}">
                </div>

                <!-- Campo para ingresar la expresión de la fórmula -->
                <div class="mb-3">
                    <label for="expresion_formula">Expresión de la Fórmula</label>
                    <input type="text" name="expresion_formula" id="expresion_formula" class="form-control" value="{{ old('expresion_formula') }}">
                </div>

                <!-- Campo para ingresar el peso de la fórmula -->
                <div class="mb-3">
                    <label for="peso_formula">Peso de la Fórmula</label>
                    <input type="text" name="peso_formula" id="peso_formula" class="form-control" value="{{ old('peso_formula') }}">
                </div>

                <!-- Campo para seleccionar el criterio de evaluación asociado -->
                <div class="mb-3">
                    <label for="id_criterio_evaluacion">Criterio de Evaluación Asociado</label>
                    <select name="id_criterio_evaluacion" id="id_criterio_evaluacion" class="form-control">
                        @foreach($criterios as $criterio)
                            <option value="{{ $criterio->id }}" {{ old('id_criterio_evaluacion') == $criterio->id ? 'selected' : '' }}>
                                {{ $criterio->Nombre_Criterio }}
                            </option>
                        @endforeach
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
