@extends('layouts.master')

@section('title', 'Agregar Rol')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="">Agregar Rol</h4>
            </div>

            <div class="card-body">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                @if (session('message'))
                    <div class="alert alert-success">{{ session('message') }}</div>
                @endif

                <form action="{{ route('admin.roles.store') }}" method="post">
                    @csrf
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre del rol:</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>

                    <div class="row">
                        <label for="search" class="col-sm-2 col-form-label">Buscar Permiso</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="search" placeholder="Ingrese el nombre del permiso">
                        </div>
                    </div>

                    <div class="row">
                        <label for="name" class="col-sm-2 col-form-label">Permisos</label>
                        <div class="col-sm-7">
                            <div class="form-group">
                                <div class="tab-content">
                                    <div class="tab-pane active">
                                        <table class="table">
                                            <tbody>
                                                @foreach ($permissions as $id => $permission)
                                                    <tr>
                                                        <td>
                                                            <div class="form-check">
                                                                <label class="form-check-label">
                                                                    <input class="form-check-input" type="checkbox"
                                                                        name="permissions[]" value="{{ $id }}">
                                                                    <span class="form-check-sign">
                                                                        <span class="check"></span>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {{ $permission }}
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>

@endsection
