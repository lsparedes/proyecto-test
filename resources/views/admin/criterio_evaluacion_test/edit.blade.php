@extends('layouts.master')

@section('title', 'Editar Relación CriterioEvaluacionTest')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#e1ecec">
            <h4>Editar Relación CriterioEvaluacionTest</h4>
        </div>
        <div class="card-body">
            @if (session('message'))
                <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <form method="POST" action="{{ route('admin.update-criterio_evaluacion_test', $criterioEvaluacionTest->id) }}">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="id_criterio_evaluacion" class="form-label">Criterio de Evaluación</label>
                    <select name="id_criterio_evaluacion" class="form-select" required>
                        @foreach ($criteriosEvaluacion as $criterioEvaluacion)
                            <option value="{{ $criterioEvaluacion->id }}" {{ $criterioEvaluacionTest->id_criterio_evaluacion == $criterioEvaluacion->id ? 'selected' : '' }}>
                                {{ $criterioEvaluacion->Nombre_Criterio }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="id_test" class="form-label">Test Asociado</label>
                    <select name="id_test" class="form-select" required>
                        @foreach ($tests as $test)
                            <option value="{{ $test->id }}" {{ $criterioEvaluacionTest->id_test == $test->id ? 'selected' : '' }}>
                                {{ $test->name_test }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <button type="submit" class="btn btn-sm btn-primary">Guardar Cambios</button>
                    <a href="{{ route('admin.criterio_evaluacion_test') }}" class="btn btn-sm btn-secondary">Cancelar</a>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
