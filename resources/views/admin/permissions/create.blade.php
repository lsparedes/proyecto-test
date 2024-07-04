@extends('layouts.master')

@section('title', 'Agregar Permiso')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.permissions') }}" class="btn btn-m  mr-3"><i class="fas fa-arrow-left-long"></i></a>Agregar Permiso</h4>
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

                <form action="{{ route('admin.permissions.store') }}" method="post">
                    @csrf
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre del permiso:</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px;">Guardar</button>
                </form>
            </div>
        </div>
    </div>

@endsection
