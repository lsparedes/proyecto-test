@extends('layouts.master')

@section('title', 'Editar Permiso')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#e1ecec">
            <h4 class="">Editar Permiso</h4>
        </div>

        <div class="card-body">
            @if (session('message'))
                <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <form method="post" action="{{ route('admin.permissions.update', $permission->id) }}">
                @csrf
                @method('put')

                <div class="mb-3">
                    <label for="name" class="form-label">Nombre:</label>
                    <input type="text" name="name" value="{{ $permission->name }}" class="form-control">
                </div>

                <button type="submit" class="btn btn-sm btn-primary">Guardar Cambios</button>
            </form>
        </div>
    </div>
</div>

@endsection
