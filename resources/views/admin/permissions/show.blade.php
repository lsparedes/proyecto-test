@extends('layouts.master')

@section('title', 'Mostrar permiso')

@section('content')


    <div class="container-fluid px-4">


        <div class="card mt-4">

            <div class="card-header card-header-primary" style="background-color:#e1ecec">

                <h2 class="card-title">Permisos</h2>
                <p class="card-text">Vista detallada del permiso: {{ $permission->name }}</p>
            </div>

            <!--body-->
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="card-body">
                                <p class="card-text">
                                <div class="author">
                                    <a href="#">
                                        <h5 class="title mt-3">{{ $permission->name }}</h5>
                                    </a>
                                    <p class="description">
                                        {{ $permission->guard_name }} <br>
                                        {{ $permission->created_at }}
                                    </p>
                                </div>
                                </p>
                                <div class="card-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officia corporis
                                    molestiae aliquid provident placeat.
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="button-container">
                                    <a href="{{ route('admin.permissions') }}" class="btn btn-sm  mr-3"><i class="fas fa-arrow-left-long"></i> Volver </a>
                                    <a href="{{ route('admin.permissions.edit', $permission->id) }}"
                                        class="btn btn-sm btn-success"><i class="fas fa-pen"></i> Editar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

@endsection
