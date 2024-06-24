@extends('layouts.master')

@section('title', 'Editar Métrica')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4><a href="{{ route('admin.metrica') }}" class="btn btn-m  mr-3"><i
                class="fas fa-arrow-left-long"></i></a>Editar Métrica</h4>
        </div>
        <div class="card-body">

            @if (session('message'))
                <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <form action="{{ route('admin.update-metrica', $metrica->id) }}" method="POST">
                @csrf
                @method('PUT')

                <!-- Campo para editar el nombre de la métrica -->
                <div class="mb-3">
                    <label for="nombre_metrica">Nombre de la Métrica</label>
                    <input type="text" name="nombre_metrica" id="nombre_metrica" class="form-control" value="{{ $metrica->nombre_metrica }}">
                </div>

                <!-- Campo para editar el peso de la métrica -->
                <div class="mb-3">
                    <label for="peso_metrica">Peso de la Métrica</label>
                    <input type="text" name="peso_metrica" id="peso_metrica" class="form-control" value="{{ $metrica->peso_metrica }}">
                </div>

                <!-- Campo para editar la descripción de la métrica -->
                <div class="mb-3">
                    <label for="descripcion_metrica">Descripción de la Métrica</label>
                    <textarea name="descripcion_metrica" id="descripcion_metrica" class="form-control">{{ $metrica->descripcion_metrica }}</textarea>
                </div>

                <!-- Campo para seleccionar el criterio de evaluación asociado -->
                <div class="mb-3">
                    <label for="id_criterio_evaluacion">Criterio de Evaluación Asociado</label>
                    <select name="id_criterio_evaluacion" id="id_criterio_evaluacion" class="form-control">
                        @foreach($criterios as $criterio)
                            <option value="{{ $criterio->id }}" {{ $metrica->id_criterio_evaluacion == $criterio->id ? 'selected' : '' }}>
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
