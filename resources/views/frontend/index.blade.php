@extends('layouts.app')

@section('content')
    <section id="features">

        <!-- Header-->
        <header class="bg-dark py-5" style="margin-top: 60px;">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-4 fw-bolder text-white mb-4">Exploración NeuroCognitiva Digital</h1>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container px-4 px-lg-2 mt-3">

            <div class="text-center my-4">
                <a href="{{ url('/?modulo=1') }}"
                    class="btn {{ $modulo == 1 ? 'btn-primary' : 'btn-outline-primary' }} me-2">
                    Módulo 1
                </a>

                <a href="{{ url('/?modulo=2') }}"
                    class="btn {{ $modulo == 2 ? 'btn-success' : 'btn-outline-success' }} me-2">
                    Módulo 2
                </a>

                <a href="{{ url('/?modulo=3') }}" class="btn {{ $modulo == 3 ? 'btn-dark' : 'btn-outline-dark' }}">
                    Módulo 3
                </a>
            </div>

            <p class="text-center text-muted">
                Mostrando tests del Módulo {{ $modulo }}
            </p>

            <div class="bg-light my-4 py-3 text-center">
                <div>
                    <form id="searchForm">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" class="form-control" id="searchInput" placeholder="Buscar Test">
                        </div>
                    </form>
                </div>
            </div>

            <div class="row gx-4 gx-lg-" id="testContainer">
                @forelse ($tests as $test)
                    <div class="col-md-4 mb-5">
                        <a href="{{ route('info-test', ['test_id' => $test->id]) }}" class="card h-100 text-decoration-none">

                            <div class="card-header text-center">
                                <p class="card-text"></p>
                            </div>

                            <div class="card-body text-center">
                                <h2 class="card-title mt-3">{{ $test->id }} - {{ $test->name_test }}</h2>

                                <p class="card-text">
                                    <i class="fas fa-clock"></i> Duración estimada:
                                    {{ $test->duracion_minutos }} minutos
                                </p>

                                <div class="card-footer">
                                    <p class="card-text">
                                        <i class="fa-solid fa-globe"></i> Fuente:
                                        {{ $test->tipoTest->fuente }} ({{ $test->tipoTest->implementacion }})
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                @empty
                    <div class="col-12 text-center">
                        <div class="alert alert-warning">
                            No hay tests asignados a este módulo.
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <!-- Footer -->
    <div class="global-footer">
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p class="col-md-4 mb-0 text-muted">2024 NeuroTest</p>

                <a href="/"
                    class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32">
                        <use xlink:href="#bootstrap" />
                    </svg>
                </a>

                <ul class="nav col-md-4 justify-content-end">
                    <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Inicio</a></li>
                </ul>
            </footer>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var idParticipante = @json($IDparticipante);
            console.log('ID Participante:', idParticipante);
        });
    </script>
@endsection