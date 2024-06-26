@extends('layouts.master')

@section('title', 'Mostrar Usuario')

@section('content')


    <div class="container-fluid px-4">


        <div class="card mt-4">

            <div class="card-header card-header-primary" style="background-color:#1d8eaa28">

                <h4 class="card-title"><a href="{{ route('admin.users') }}" class="btn btn-sm mr-3"><i
                    class="fas fa-arrow-left-long fa-lg"></i></a>Usuario</h4>
                <p class="card-text">Vista detallada del usuario: {{ $user->name }}</p>
            </div>

            <!--body-->
            <div class="card-body">
                @if (session('success'))
                    <div class="alert alert-success" role="success">
                        {{ session('success') }}
                    </div>
                @endif
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="card-body">
                                <p class="card-text">
                                <div class="author">
                                    <a>
                                        <img src="{{ asset('assets/img/default-avatar.png') }}" alt="image"
                                            class="avatar">
                                        <h4 class="title mt-3">{{ $user->name }}</h4>
                                    </a>
                                    <p class="description">
                                        - Email: {{ $user->email }} <br>
                                        - Fecha creacion: {{ $user->created_at->toFormattedDateString() }}
                                    </p>
                                </div>
                                </p>
                                <div class="card-description">
                                    <p>- Permisos relacionados al rol:</p>
                                    @forelse ($user->roles as $role)
                                        <span class="badge rounded-pill bg-dark text-white">{{ $role->name }}</span>
                                    @empty
                                        <span class="badge badge-danger bg-danger">No roles</span>
                                    @endforelse
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="button-container">
                                    <a href="{{ route('admin.edit-user', $user->id) }}" class="btn btn-sm btn-success"><i
                                            class="fas fa-pen"></i> Editar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

@endsection
