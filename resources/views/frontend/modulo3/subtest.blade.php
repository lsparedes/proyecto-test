@extends('layouts.app')

@section('content')
    <section id="features">
        <header class="bg-dark py-3" style="margin-top: 60px;">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center align-items-center">
                    <div class="row">
                        <div class="back-button-container ">
                            <a href="{{ route('modulo3.parts.show', $subtest->part) }}" class="back-button">
                                <i class="fas fa-arrow-left"></i> Volver
                            </a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center my-4">
                                <div class="header-container">
                                    <div class="text-container">
                                        <h1 class="display-5 fw-bolder text-white mb-2">
                                            {{ $subtest->title }}
                                        </h1>

                                        <p class="lead text-white-50 mb-1">
                                            <i class="fas fa-list"></i> Parte: {{ $subtest->part->title }}
                                        </p>

                                        <p class="lead text-white-50 mb-1">
                                            <i class="fa-solid fa-globe"></i>
                                            Fuente:
                                            <span class="fuente-container">
                                                <span class="fuente-text">Modulo 3</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container mb-5">
                        <div class="row justify-content-center">
                            <div class="col-auto">
                                <button type="button" class="btn btn-outline-light btn-lg btn-block" disabled>
                                    <i class="fas fa-play"></i>
                                    <span>Placeholder</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container my-5">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card p-4 pb-0 h-100">
                        <div class="card-body">
                            <p class="lead text-dark-50 mb-4">
                                <b>{{ $subtest->title }}</b>
                            </p>

                            <p class="lead text-dark-50">
                                {{ $subtest->description }}
                            </p>

                            <p class="lead text-dark-50">
                                {{ $subtest->instructions }}
                            </p>

                            <p class="lead text-dark-50">
                                {{ $subtest->placeholder_note }}
                            </p>
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
@endsection
