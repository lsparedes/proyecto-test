@extends('layouts.app')

@section('content')
    <section class="py-5" style="margin-top: 60px; min-height: 100vh; background: linear-gradient(180deg, #f8f9fa 0%, #eef3f8 100%);">
        <div class="container py-4">
            <div class="row justify-content-center mb-5">
                <div class="col-lg-9 text-center">
                    <span class="badge bg-dark mb-3">Modulo 3</span>
                    <h1 class="display-5 fw-bold">Evaluacion Motora del Habla</h1>
                    <p class="lead text-muted">
                        Estructura base del modulo con partes y subtests placeholder para conectar luego assets, grabacion y logica clinica.
                    </p>
                </div>
            </div>

            <div class="row g-4">
                @forelse ($parts as $part)
                    <div class="col-lg-4">
                        <div class="card h-100 shadow-sm border-0">
                            <div class="card-body p-4">
                                <p class="text-uppercase text-muted small mb-2">Parte {{ $part->sort_order }}</p>
                                <h2 class="h4 mb-3">{{ $part->title }}</h2>
                                <p class="text-muted">{{ $part->description }}</p>
                                <p class="mb-4">
                                    <span class="badge bg-secondary">{{ $part->subtests_count }} subtests</span>
                                </p>
                                <a href="{{ route('modulo3.parts.show', $part) }}" class="btn btn-dark">
                                    Ver parte
                                </a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="alert alert-warning mb-0">
                            No hay partes configuradas para el Modulo 3.
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    </section>
@endsection
