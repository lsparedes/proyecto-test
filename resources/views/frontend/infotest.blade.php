@extends('layouts.app')

@section('content')
    <section id="features">

        <header class="bg-dark py-3" style="margin-top: 60px;">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center align-items-center">
                    <div class="row">
                        <div class="back-button-container ">
                            <!-- Botón de Volver -->
                            <a href="{{ url('/') }}" class="back-button">
                                <i class="fas fa-arrow-left"></i> Volver
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center my-4">
                                <div class="header-container">

                                    <div class="text-container">
                                        <!-- Título y descripciones -->
                                        <h1 class="display-5 fw-bolder text-white mb-2">{{ $test->name_test }}</h1>
                                        
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
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mb-5">
                        <div class="row justify-content-center ">
                            @if (!empty($test->url_test))
                            <div class="col-auto ">
                                <a href="/{{ $test->url_test }}" target="_blank" class="col">     
                                    <button type="button" class="btn btn-outline-light btn-lg btn-block"> <i class="fas fa-play"></i> <span>{{$test->nombre_url}}</span></button>
                                </a>
                            </div>
                            @endif
                            @if (!empty($test->url_adicional))
                            <div class="col-auto ">
                                <a href="/{{ $test->url_adicional }}" target="_blank" class="col">            
                                    <button type="button" class="btn btn-outline-light btn-lg btn-block"><i class="fas fa-play"></i> <span>{{$test->nombre_url_opcional}}</span></button>        
                                </a>
                            </div>
                            @endif
                            @if (!empty($test->link_millisecond))
                            <div class="col-auto ">
                                <a href="/{{ $test->link_millisecond }}" target="_blank" class="col" >          
                                    <button type="button" class="btn btn-outline-light btn-lg btn-block"><i class="fas fa-play"></i> <span>{{$test->nombre_url_opcional}}</span></button>
                                </a>
                            </div>
                            @endif
                            @if (!empty($test->link_millisecond2))
                            <div class="col-auto ">
                                <a href="/{{ $test->link_millisecond2 }}" target="_blank" class="col">            
                                    <button type="button" class="btn btn-outline-light btn-lg btn-block"><i class="fas fa-play"></i> <span>{{$test->nombre_url_opcional}}</span></button>
                                </a>
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </header>


        <div class="container my-5">
            <div class="row ">
             
                <div class="col-sm-12">
                    <div class="card p-4 pb-0 h-100">
                        <div class="card-body">
                           <p class="lead text-dark-50 mb-4"><b>{{ $test->tipoTest->descripcion }}</b></p>
                            <p class="lead text-dark-50 ">{{ $test->tipoTest->descripcion_test }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

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
