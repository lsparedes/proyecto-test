<style>
    /* fondo degradado al header */
    header.bg-dark {
        background: linear-gradient(to bottom, #212529, #24434b);
    }


    header.drag-header {
        cursor: grab;
    }


</style>

@extends('layouts.app')

@section('content')
    <section id="features">

        <header class="bg-dark py-3">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <div class="header-container">
                                <div>
                                    <h1 class="display-5 fw-bolder text-white mb-2">{{ $test->name_test }}</h1>
                                    <p class="lead text-white-50 mb-4">{{ $test->tipoTest->descripcion }}</p>
                                    <p class="lead text-white-50 mb-1">{{ $test->tipoTest->descripcion_test }}</p>

                                    <p class="lead text-white-50 mb-1" style="margin-top: 10px;"><i class="fas fa-clock"></i> Duracion estimada:
                                        {{ $test->duracion_minutos }} minutos</p>
                                    <p class="lead text-white-50 mb-1" style="margin-top: 10px;"><i class="fa-solid fa-globe"></i> Fuente:
                                            {{ $test->tipoTest->fuente }}</p>
                                </div>
                                <div style="margin-left: 50px;">
                                    <!-- Botones para cada enlace -->
                                    <a href="/{{ $test->url_test }}" target="_blank" class="circular-button">
                                        <i class="fas fa-play"></i>
                                    </a>

                                    @if (!empty($test->url_adicional))
                                    <a href="/{{ $test->url_adicional }}" target="_blank" class="circular-button additional">
                                      <i class="fas fa-play"></i>
                                      <span>Backward</span>  </a>
                                  @endif
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container my-5">
            <div class="row ">
                <div class="col-sm-6">
                    <div class="card p-4 h-100">
                        <div class="card-body">
                            <h5 class="card-title">Instrucciones</h5>
                            <p class="card-text">{{ $test->tipoTest->instruccion_test }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card p-4 h-100">
                        <div class="card-body">
                            <h5 class="card-title">Audio Instrucciones</h5>
                            <audio class="w-100" controls>
                                <source src="{{ asset('uploads/' . $test->tipoTest->audio_instruccion) }}"
                                    type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

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

    <!-- Contenedor del iframe -->
    <div id="iframeContainer" style="display: none;">
        <iframe id="myIframe" src="" width="100%" height="600px" frameborder="0"></iframe>
    </div>

    <!-- Script para abrir enlaces en pantalla completa -->
    <script>
        document.getElementById('openIframeButton').addEventListener('click', function() {
            // URL test
            window.open('{{ $test->url_test }}', '_blank');
        });
    </script>
@endsection
