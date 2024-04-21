@extends('layouts.app')

@section('content')
    <section id="features">

        <header class="bg-dark py-3" style="margin-top: 60px;">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center align-items-center">
                    <div class="back-button-container ">
                        <!-- Botón de Volver -->
                        <a href="{{ url('/') }}" class="back-button">
                            <i class="fas fa-arrow-left"></i> Volver
                        </a>
                    </div>
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <div class="header-container">

                                <div class="text-container">
                                    <!-- Título y descripciones -->
                                    <h1 class="display-5 fw-bolder text-white mb-2">{{ $test->name_test }}</h1>
                                    <p class="lead text-white-50 mb-4">{{ $test->tipoTest->descripcion }}</p>
                                    <p class="lead text-white-50 mb-1">{{ $test->tipoTest->descripcion_test }}</p>
                                    <p class="lead text-white-50 mb-1"><i class="fas fa-clock"></i> Duración estimada:
                                        {{ $test->duracion_minutos }} minutos</p>
                                    <p class="lead text-white-50 mb-1">
                                        <i class="fa-solid fa-globe"></i>
                                        Fuente:
                                        <span id="fuenteContainer" class="fuente-container">
                                            <span id="fuenteText" class="fuente-text">{{ $test->tipoTest->fuente }}</span>
                                            @if (!empty($test->tipoTest->link_fuente))
                                                <i class="fas fa-chevron-down" id="fuenteArrow"></i>
                                            @endif
                                        </span>
                                        @if (!empty($test->tipoTest->link_fuente))
                                            <ul id="fuenteDropdown" class="fuente-dropdown">
                                                <li><a href="{{ $test->tipoTest->link_fuente }}" target="_blank">Ver
                                                        fuente</a></li>
                                            </ul>
                                        @endif
                                    </p>

                                </div>
                                <div class="buttons-container">
                                    <!-- Botones para cada enlace -->
                                    @if (!empty($test->url_test))
                                        <a href="/{{ $test->url_test }}" target="_blank" class="circular-button">
                                            <i class="fas fa-play"></i>
                                        </a>
                                    @endif
                                    @if (!empty($test->url_adicional))
                                        <a href="/{{ $test->url_adicional }}" target="_blank"
                                            class="circular-button additional">
                                            <i class="fas fa-play"></i>
                                            <span>Backward</span>
                                        </a>
                                    @endif
                                    @if (!empty($test->link_millisecond))
                                        <a href="{{ $test->link_millisecond }}" target="_blank"
                                            class="circular-button additional">
                                            <i class="fas fa-play"></i>
                                            <span>Millisecond</span>
                                        </a>
                                    @endif
                                    @if (!empty($test->link_millisecond2))
                                        <a href="{{ $test->link_millisecond2 }}" target="_blank"
                                            class="circular-button additional">
                                            <i class="fas fa-play"></i>
                                            <span>Millisecond</span>
                                        </a>
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
                            @if (!empty($test->tipoTest->instrucciones_adicionales))
                            <div class="my-4"></div>
                                <h5 class="card-title"><i class="fas fa-arrow-right me-2"></i>Instrucciones de instalacion</h5>
                                <div class="d-flex align-items-center mb-3">
                                    <p class="card-text text-justify">{{ $test->tipoTest->instrucciones_adicionales }}</p>
                                </div>
                            @endif
                            @if (!empty($test->tipoTest->enlace_descarga))
                                <div class="text-center">
                                    <a href="{{ $test->tipoTest->enlace_descarga }}" class="btn btn-primary" target="_blank">Descargar Aplicación</a>
                                </div>
                            @endif
                            <div class="my-4"></div>
                            <h5 class="card-title">Instrucciones del test</h5>
                            <p class="card-text text-justify">{{ $test->tipoTest->instruccion_test }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card p-4 h-100">
                        <div class="card-body">
                            <div class="my-4"></div>
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


    <!-- Script para mostrar link_fuente en infotest-->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var fuenteContainer = document.getElementById('fuenteContainer');
            var fuenteDropdown = document.getElementById('fuenteDropdown');
            var fuenteArrow = document.getElementById('fuenteArrow');

            fuenteContainer.addEventListener('click', function() {
                if (fuenteDropdown.style.display === 'none') {
                    fuenteDropdown.style.display = 'block';
                    fuenteArrow.classList.remove('fa-chevron-down');
                    fuenteArrow.classList.add('fa-chevron-up');
                } else {
                    fuenteDropdown.style.display = 'none';
                    fuenteArrow.classList.remove('fa-chevron-up');
                    fuenteArrow.classList.add('fa-chevron-down');
                }
            });

            // Cerrar el menú desplegable si se hace clic fuera de él
            document.addEventListener('click', function(event) {
                if (!fuenteContainer.contains(event.target) && !fuenteDropdown.contains(event.target)) {
                    fuenteDropdown.style.display = 'none';
                    fuenteArrow.classList.remove('fa-chevron-up');
                    fuenteArrow.classList.add('fa-chevron-down');
                }
            });
        });
    </script>
@endsection
