@extends('layouts.master')

@section('title', 'Mostrar Rol')

@section('content')


    <div class="container-fluid px-4">


        <div class="card mt-4">

            <div class="card-header card-header-primary" style="background-color:#1d8eaa28">

                <h2 class="card-title"><a href="{{ route('admin.roles') }}" class="btn btn-m  mr-3"><i
                    class="fas fa-arrow-left-long"></i></a>Roles</h2>
                <p class="card-text">Vista detallada del rol: {{ $role->name }}</p>
            </div>

            <!--body-->
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="card-body">
                                <p class="card-text">
                                <div class="author">
                                    <a>
                                        <h4 class="title mt-3">{{ $role->name }}</h4>
                                    </a>
                                    <p class="description">
                                        - Guard name: {{ $role->guard_name }} <br>
                                        - Fecha Creacion: {{ $role->created_at->toFormattedDateString() }}
                                    </p>
                                </div>
                                </p>
                                <div class="card-description" style="margin-bottom: 25px">
                                    <p>- Permisos relacionados al rol:</p>
                                    @forelse ($role->permissions as $permission)
                                        <span class="badge rounded-pill badge-info">{{ $permission->name }}</span>
                                    @empty
                                        <span class="badge rounded-pill badge-danger bg-danger">No tiene permisos</span>
                                    @endforelse
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="button-container">
                                    <a href="{{ route('admin.roles.edit', $role->id) }}" class="btn btn-m btn-success"><i
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
