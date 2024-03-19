@extends('layouts.master')

@section('title', 'Preguntas y Alternativas')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4>Listado de Preguntas y Alternativas</h4>
            </div>
            <div class="card-body">
                @foreach ($preguntas as $pregunta)
                    <h5>Pregunta: {{ $pregunta->texto_pregunta }}</h5>
                    <ul>
                        @foreach ($pregunta->alternativas as $alternativa)
                            <li>{{ $alternativa->texto_alternativa }} - {{ $alternativa->es_correcta ? 'Correcta' : 'Incorrecta' }}</li>
                        @endforeach
                    </ul>
                @endforeach
            </div>
        </div>

    </div>

@endsection
