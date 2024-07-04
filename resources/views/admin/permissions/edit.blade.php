@extends('layouts.master')

@section('title', 'Editar Permiso')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4 class=""><a href="{{ route('admin.permissions') }}" class="btn btn-m  mr-3"><i
                class="fas fa-arrow-left-long"></i></a>Editar Permiso</h4>
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

                <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px;">Guardar</button>
            </form>
        </div>
    </div>
</div>

@endsection
