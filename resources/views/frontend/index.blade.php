@extends('layouts.app')

@section('content')
    <section id="features">

        <!-- Header-->
        <header class="bg-dark py-5" style="margin-top: 60px;">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-4 fw-bolder text-white mb-4">Tests protocolo neurocognitivo</h1>
                            <!-- <p class="lead text-white-50 mb-3">Quickly design and customize responsive mobile-first sites
                                with Bootstrap, the world’s most popular front-end open source toolkit!</p> -->
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>


        <div class="container px-4 px-lg-2 mt-3">

            <div class="bg-light my-4 py-3 text-center">
                <div>
                    <!-- <h2>Listado de Tests</h2> -->
                    <!-- Busqueda test-->
                    <form id="searchForm">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" class="form-control" id="searchInput" placeholder="Buscar Test">
                        </div>
                    </form>
                </div>
            </div>

            <div class="row gx-4 gx-lg-" id="testContainer">
                @foreach ($testIds as $testId)
                    @php
                        $test = $tests->where('id', $testId)->first();
                    @endphp
                    <div class="col-md-4 mb-5">
                        <a href="{{ route('info-test', ['test_id' => $test->id]) }}"
                            class="card h-100 text-decoration-none ">

                            <div class="card-header text-center">
                                <i class="fas {{ $test->tipoTest->icono }}" data-toggle="tooltip"
                                    title="{{ $test->tipoTest->icono === 'fa-solid fa-download' ? 'Necesita Descargar' : 'Vista Web' }}"></i>
                                <p class="card-text"> {{ $test->tipoTest->implementacion}}</p>
                            </div>

                            <div class="card-body text-center">

                                <h2 class="card-title mt-3">{{ $test->tipoTest->num_test }} -
                                    {{ $test->tipoTest->descripcion }}</h2>
                                <p class="card-text"> {{ $test->name_test }}</p>
                                <p class="card-text"><i class="fas fa-clock"></i> Duración estimada:
                                    {{ $test->duracion_minutos }} minutos</p>
                                <div class="card-footer ">
                                    <p class="card-text"><i class="fa-solid fa-globe"></i> Fuente:
                                        {{ $test->tipoTest->fuente }}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
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
@endsection
