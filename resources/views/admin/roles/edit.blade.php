@extends('layouts.master')

@section('title', 'Editar Rol')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.roles') }}" class="btn btn-m  mr-3"><i
                    class="fas fa-arrow-left-long"></i></a>Editar Rol</h4>
            </div>

            <div class="card-body">
                @if (session('message'))
                    <div class="alert alert-success">{{ session('message') }}</div>
                @endif

                <form method="post" action="{{ route('admin.roles.update', $role->id) }}">
                    @csrf
                    @method('put')

                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <input type="text" name="name" value="{{ $role->name }}" class="form-control">
                    </div>

                    <div class="row">
                        <label for="search" class="col-sm-2 col-form-label">Buscar Permiso</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="search" placeholder="Ingrese el nombre del permiso">
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-sm-7 offset-sm-2">
                            <table class="table">
                                <tbody id="permissions-table">
                                    @foreach ($permissions as $id => $permission)
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input permission-checkbox" type="checkbox"
                                                            name="permissions[]" value="{{ $id }}"
                                                            {{ $role->permissions->contains($id) ? 'checked' : '' }}>
                                                        <span class="form-check-sign">
                                                            <span class="check" value=""></span>
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

                    <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px;">Guardar</button>
                </form>
            </div>
        </div>
    </div>

@endsection
