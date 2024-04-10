@extends('layouts.app')

@section('content')
    <section id="features">

        <!-- Header-->
        <header class="bg-dark py-5">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-5 fw-bolder text-white mb-2">Tests protocolo neurocognitivo</h1>
                            <p class="lead text-white-50 mb-4">Quickly design and customize responsive mobile-first sites
                                with Bootstrap, the world’s most popular front-end open source toolkit!</p>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>


        <div class="container px-4 px-lg-2 mt-3">

            <div class="card text-black bg-light my-4 py-3 text-center">
                <div class="card-body">
                    <h2>Listado de Tests</h2>
                    <!-- Busqueda test-->
                    <form id="searchForm">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="searchInput" placeholder="Buscar Test">
                        </div>
                    </form>
                </div>
            </div>


            <div class="row gx-4 gx-lg-" id="testContainer">
                @foreach ($testIds as $testId)
                @php
                    // Obtener el test actual
                    $test = $tests->where('id', $testId)->first();
                @endphp
                <div class="col-md-4 mb-5">
                    <div class="card h-100">
                        <!-- Aquí incluimos el ícono del test -->
                        <div class="card-body text-center">
                            <i class="fas {{ $test->tipoTest->icono }}" data-toggle="tooltip" title="{{ $test->tipoTest->icono === 'fa-solid fa-download' ? 'Necesita Descargar' : 'Vista Web' }}"></i>
                            <h2 class="card-title mt-3">{{ $test->tipoTest->num_test }} {{ $test->name_test }}</h2>
                            <p class="card-text">{{ $test->tipoTest->descripcion }}</p>
                        </div>
                        <div class="card-footer">
                            <a class="btn btn-ind btn-md" href="{{ route('info-test', ['test_id' => $test->id]) }}">Más Información <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- Footer -->
    <div class="global-footer">
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p class="col-md-4 mb-0 text-muted">2024 Company, Inc</p>

                <a href="/"
                    class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32">
                        <use xlink:href="#bootstrap" />
                    </svg>
                </a>

                <ul class="nav col-md-4 justify-content-end">
                    <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
                </ul>
            </footer>
        </div>

    </div>
@endsection
